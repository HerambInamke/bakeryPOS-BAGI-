## Repository: BakeryPOS — Copilot instructions

This file helps AI coding agents become productive quickly in this repository.

NOTE: At the time this file was generated the workspace contained no source files or README. Use the "Discovery" steps below to find project-specific files and then update this document with concrete examples (build commands, key files, conventions).

What I (an AI coding agent) should do first
- Run a fast inventory: list files and common config files.
  - PowerShell: `Get-ChildItem -Force -Recurse -ErrorAction SilentlyContinue`
  - `git status --porcelain --untracked` to see repo state.
- Look for these files (in order): `README.md`, `package.json`, `pyproject.toml`, `requirements.txt`, `setup.py`, `pom.xml`, `Makefile`, `Dockerfile`, `tsconfig.json`, `.csproj`, `.sln`, `build.gradle`.
- If any of the above exist, open them to extract build/test commands and dependency managers.

Quick decision rules (how to act when files are present)
- If `package.json` exists: prefer `npm`/`pnpm`/`yarn` scripts. Look for `scripts.build`, `scripts.test`, `scripts.start` and cite exact commands.
- If Python files + `pyproject.toml`/`requirements.txt`: prefer `python -m venv .venv; .\.venv\Scripts\Activate.ps1; pip install -r requirements.txt` to install and run tests with `pytest` if present.
- If .NET (`*.csproj` or `.sln`): use `dotnet build` and `dotnet test`.

What to document here (concise, concrete items the human maintainer expects)
- The primary language and framework (e.g., "C# (dotnet) web API", "Node/Express", "Python/Flask").
- The standard developer start/build/test commands (exact shell commands for PowerShell on Windows).
- Any nonstandard conventions (naming patterns, where to find migrations, generated code, codegen steps).
- Key integration points and external services (databases, message queues, third-party APIs) and where credentials/config are loaded (env files, Azure Key Vault, AWS Secrets Manager).

Useful examples to add when repository files are present
- Example: "Build: `npm ci; npm run build` (see `package.json` scripts)", or "Run tests: `pytest tests/ -q`" — include the exact file lines that justify these commands.
- Example: "Migrations: database migrations live in `migrations/` and are applied with `alembic upgrade head` (see `alembic.ini`)".

Patterns and conventions to capture (only if present)
- API routes or controllers directory (e.g., `src/controllers` or `app/controllers`) and the expected request/response shapes.
- Data models location (e.g., `models/`, `src/models/`) and any serialization conventions (e.g., use of DTOs or ORM models).
- Where environment-specific config lives (`.env`, `config/*.json`, `appsettings.*.json`) and how environment is selected.

Safety and limits for automated edits
- Prefer small, focused PRs with one logical change. When adding code, include/modify tests.
- Do not run dangerous scripts (DB destructive migrations or deployment scripts) without an explicit instruction from a human.

How to propose changes back to humans
- When making edits: open a concise PR with a small description and a checklist of what was run locally (build/test commands and results).
- When uncertain about architecture or missing files, update this file with the discovery output and a short list of open questions.

Placeholders for maintainers to fill (update this file with concrete lines)
- Primary language/framework: [fill me]
- Build command (PowerShell): [fill me]
- Test command (PowerShell): [fill me]
- Start/run command (PowerShell): [fill me]
- Key files to inspect: [fill me]

— End of auto-generated template. After you add repository files, re-run the discovery steps and replace placeholders with exact commands and examples from the codebase.
