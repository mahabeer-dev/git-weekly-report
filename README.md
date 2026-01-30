# Git Weekly Report

[![npm version](https://img.shields.io/npm/v/git-weekly-report.svg)](https://www.npmjs.com/package/git-weekly-report)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

> **Automate your weekly status reports.**  
> `git-weekly-report` is a lightweight CLI tool that scans your local git repositories and generates a markdown summary of your work for the week.

Perfect for developers who need to submit weekly updates, stand-up notes, or work logs.

## 🚀 Features

- **Multi-Repo Scanning**: Automatically finds all git repositories in a specified directory.
- **Customizable Timeframe**: Generate reports for the last 7 days, 14 days, or any custom duration.
- **Markdown Output**: Creates a clean, ready-to-share `weekly-report.md` file.
- **Privacy Focused**: Runs entirely locally. No data is sent to the cloud.
- **Zero Config**: Works out of the box using your global `.gitconfig`.

## 📦 Installation

You can run it directly with `npx` or install it globally via `npm`.

### Using npx (Recommended)
```bash
npx git-weekly-report
```

### Global Install
```bash
npm install -g git-weekly-report
```

## 🛠 Usage

Simply run the command in your terminal:

```bash
git-weekly-report
```

By default, this will:
1. Scan for repositories in `~/Documents/projects`
2. Look for commits from the last **7 days**
3. Generate a file named `weekly-report.md` in the current directory

### Custom Options

You can customize the behavior using CLI flags:

| Flag | Description | Default | Example |
|------|-------------|---------|---------|
| `--dir` | Directory containing your git projects | `~/Documents/projects` | `--dir ~/Work/dev` |
| `--days` | Number of days to look back | `7` | `--days 5` |
| `--out` | Output filename | `weekly-report.md` | `--out status.md` |

### Examples

**Scan a specific directory for the last 5 days:**
```bash
git-weekly-report --dir ~/my-work-folder --days 5
```

**Generate a report for the last month:**
```bash
git-weekly-report --days 30 --out monthly-summary.md
```

## 📄 Example Output

The generated markdown file looks like this:

```markdown
# Weekly Report

**Name:** John Doe
**Email:** john@example.com
**Period:** 2023-10-01 → 2023-10-08

---

## 📦 my-awesome-project (3 commits)
- feat: add login page
- fix: resolve issue with API token
- docs: update README

## 📦 another-repo (1 commits)
- chore: bump dependencies

---

**Total commits:** 4
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License.
