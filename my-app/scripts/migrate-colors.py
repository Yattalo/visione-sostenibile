#!/usr/bin/env python3
"""
BMAD Color Migration Script
Migrates old palette tokens to new BMAD High-Contrast Nature palette.
cream → paper, charcoal → forest, moss → forest/leaf, terracotta → sun/leaf
"""

import re
import sys
import os
from pathlib import Path

# ── Color Mapping Rules ──────────────────────────────
REPLACEMENTS = [
    # ═══ CREAM → PAPER ═══
    ("cream-50", "paper-50"),
    ("cream-100", "paper-100"),
    ("cream-200", "paper-300"),     # cream-200 borders → paper-300
    ("cream-300", "paper-400"),
    ("cream-400", "paper-400"),
    ("cream-500", "paper-500"),
    ("cream-600", "paper-600"),

    # ═══ CHARCOAL → FOREST ═══
    ("charcoal-950", "forest-950"),
    ("charcoal-900", "forest-950"),
    ("charcoal-800", "forest-950"),
    ("charcoal-700", "forest-900"),
    ("charcoal-600", "forest-800"),
    ("charcoal-500", "forest-800/70"),
    ("charcoal-400", "forest-800/60"),
    ("charcoal-300", "forest-700"),
    ("charcoal-200", "paper-400"),
    ("charcoal-100", "paper-300"),

    # ═══ MOSS → FOREST (dark) / LEAF (light-medium) ═══
    ("moss-950", "forest-950"),
    ("moss-900", "forest-950"),
    ("moss-800", "forest-900"),
    ("moss-700", "leaf-700"),
    ("moss-600", "leaf-600"),
    ("moss-500", "leaf-500"),
    ("moss-400", "leaf-400"),
    ("moss-300", "leaf-300"),
    ("moss-200", "leaf-200"),
    ("moss-100", "leaf-100"),
    ("moss-50", "leaf-50"),

    # ═══ TERRACOTTA → SUN (CTA) / LEAF (accent) ═══
    # Buttons/CTA backgrounds
    ("bg-terracotta-500", "bg-sun-400"),
    ("bg-terracotta-600", "bg-sun-500"),
    ("hover:bg-terracotta-500", "hover:bg-sun-400"),
    ("hover:bg-terracotta-600", "hover:bg-sun-500"),
    # Light terracotta backgrounds → leaf
    ("bg-terracotta-100", "bg-leaf-100"),
    ("bg-terracotta-50", "bg-leaf-50"),
    ("bg-terracotta-200", "bg-leaf-200"),
    # Text accents
    ("text-terracotta-600", "text-leaf-600"),
    ("text-terracotta-500", "text-leaf-500"),
    ("text-terracotta-400", "text-leaf-400"),
    ("text-terracotta-300", "text-leaf-400"),
    ("text-terracotta-200", "text-leaf-300"),
    ("text-terracotta-100", "text-leaf-200"),
    ("text-terracotta-700", "text-leaf-700"),
    # Borders
    ("border-terracotta-300", "border-leaf-500"),
    ("border-terracotta-400", "border-leaf-500"),
    ("border-terracotta-500", "border-leaf-600"),
    # Focus rings
    ("ring-terracotta-400", "ring-sun-400"),
    ("border-terracotta-400", "border-sun-400"),
    # Fill (stars etc)
    ("fill-terracotta-500", "fill-sun-400"),
    # Gradients
    ("from-terracotta-500", "from-leaf-500"),
    ("from-terracotta-600", "from-leaf-600"),
    ("from-terracotta-300", "from-leaf-400"),
    ("via-terracotta-500", "via-leaf-500"),
    ("to-terracotta-500", "to-leaf-500"),
    # With opacity
    ("terracotta-500/10", "leaf-500/10"),
    ("terracotta-500/15", "leaf-500/15"),
    ("terracotta-500/20", "leaf-500/20"),
    ("terracotta-500/30", "leaf-500/30"),
    ("terracotta-600/0", "leaf-600/0"),
    ("terracotta-600/10", "leaf-600/10"),
    ("terracotta-100/40", "leaf-100/40"),
    ("terracotta-100/50", "leaf-100/50"),
    ("terracotta-200/30", "leaf-200/30"),
    ("terracotta-200/40", "leaf-200/40"),
    ("terracotta-300/50", "leaf-400/50"),
    ("terracotta-50/50", "leaf-50/50"),

    # ═══ MOSS with opacity ═══
    ("moss-900/5", "forest-950/5"),
    ("moss-900/30", "forest-950/30"),
    ("moss-900/40", "forest-950/40"),
    ("moss-900/75", "forest-950/75"),
    ("moss-900/80", "forest-950/80"),
    ("moss-900/85", "forest-950/85"),
    ("moss-900/90", "forest-950/90"),
    ("moss-900/95", "forest-950/95"),
    ("moss-800/55", "forest-900/55"),
    ("moss-800/60", "forest-900/60"),
    ("moss-800/80", "forest-900/80"),
    ("moss-800/85", "forest-900/85"),
    ("moss-800/90", "forest-900/90"),
    ("moss-500/15", "leaf-500/15"),
    ("moss-500/20", "leaf-500/20"),
    ("moss-400/10", "leaf-400/10"),
    ("moss-100/30", "leaf-100/30"),
    ("moss-100/50", "leaf-100/50"),

    # ═══ CHARCOAL with opacity ═══
    ("charcoal-900/50", "forest-950/50"),
    ("charcoal-900/60", "forest-950/60"),
    ("charcoal-900/65", "forest-950/65"),
    ("charcoal-900/70", "forest-950/70"),
    ("charcoal-900/80", "forest-950/80"),
    ("charcoal-900/85", "forest-950/85"),
    ("charcoal-900/90", "forest-950/90"),
    ("charcoal-900/5", "forest-950/5"),
    ("charcoal-900/30", "forest-950/30"),

    # ═══ CREAM with opacity ═══
    ("cream-200/60", "paper-300/60"),
    ("cream-200/80", "paper-300/80"),
    ("cream-300/40", "paper-400/40"),
    ("cream-300/50", "paper-400/50"),
    ("cream-400/40", "paper-400/40"),

    # ═══ BG-WHITE → BG-PAPER-50 (in component contexts) ═══
    # Be careful: only replace bg-white, not text-white
    ("bg-white/80", "bg-paper-50/80"),
    ("bg-white/90", "bg-paper-50/90"),
    ("bg-white/95", "bg-paper-50/95"),
]

# Files where bg-white should become bg-paper-50
BG_WHITE_FILES = [
    "contatti/page.tsx",
    "components/",
]

def migrate_file(filepath: str) -> tuple[int, list[str]]:
    """Migrate a single file. Returns (change_count, changes_list)."""
    with open(filepath, 'r') as f:
        content = f.read()

    original = content
    changes = []

    # Sort replacements by length (longest first) to avoid partial matches
    sorted_replacements = sorted(REPLACEMENTS, key=lambda x: len(x[0]), reverse=True)

    for old, new in sorted_replacements:
        if old in content:
            count = content.count(old)
            content = content.replace(old, new)
            changes.append(f"  {old} → {new} ({count}x)")

    # Handle bg-white → bg-paper-50 for specific file patterns
    rel_path = str(filepath)
    should_replace_bg_white = any(pattern in rel_path for pattern in BG_WHITE_FILES)

    if should_replace_bg_white and '"bg-white"' not in content:
        # Replace bg-white but NOT text-white, and not in quoted strings like class names
        for pattern in ["bg-white ", "bg-white\"", "bg-white\n", "bg-white\t", "bg-white'"]:
            new_pattern = pattern.replace("bg-white", "bg-paper-50")
            if pattern in content:
                count = content.count(pattern)
                content = content.replace(pattern, new_pattern)
                changes.append(f"  bg-white → bg-paper-50 ({count}x)")

    if content != original:
        with open(filepath, 'w') as f:
            f.write(content)

    return len(changes), changes


def main():
    app_dir = Path("/Users/luckyluke/projects/active/visione_sostenibile/my-app/app")

    # Find all .tsx and .ts files (exclude node_modules, .next)
    files = []
    for ext in ["*.tsx", "*.ts"]:
        files.extend(app_dir.rglob(ext))

    # Exclude already-migrated files and non-relevant files
    exclude_patterns = ["node_modules", ".next", "globals.css", "utils.ts", "ConvexClientProvider"]
    files = [f for f in files if not any(p in str(f) for p in exclude_patterns)]

    # Also include convex files if needed
    # (but they shouldn't have color classes)

    total_changes = 0
    modified_files = []

    for filepath in sorted(files):
        count, changes = migrate_file(str(filepath))
        if count > 0:
            rel = os.path.relpath(filepath, app_dir.parent)
            modified_files.append((rel, count, changes))
            total_changes += count

    # Report
    print(f"\n{'='*60}")
    print(f"BMAD Color Migration Complete")
    print(f"{'='*60}")
    print(f"Files modified: {len(modified_files)}")
    print(f"Total replacements: {total_changes}")
    print(f"{'='*60}\n")

    for filepath, count, changes in modified_files:
        print(f"\n📄 {filepath} ({count} changes):")
        for change in changes:
            print(change)

    print(f"\n{'='*60}")
    print("Done! Run 'pnpm build' to verify.")


if __name__ == "__main__":
    main()
