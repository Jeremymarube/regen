# ReGen - GitHub Branch Protection Guide

## Repository Information

- **Repository:** https://github.com/Jeremymarube/regen
- **Owner:** Jeremymarube
- **Main Branch:** `main`
- **Development Branch:** `development`

---

## Current Branch Structure

### Active Branches
```
main                    - Production-ready code
development             - Integration branch
Jeremy/Centers          - Recycling centers feature
Jeremy/Guide            - AI guide feature
Jeremy/Home             - Home page feature
lauren/dashboard        - Dashboard feature
lauren/logwaste         - Waste logging feature
Patrick                 - Patrick's feature branch
```

---

## Branch Protection Rules Setup

### For `main` Branch

#### Step 1: Navigate to Settings
1. Go to: https://github.com/Jeremymarube/regen/settings/branches
2. Click "Add branch protection rule"
3. Enter branch name pattern: `main`

#### Step 2: Configure Protection Rules

**Required Settings:**
- [x] **Require a pull request before merging**
  - [x] Require approvals: 1
  - [x] Dismiss stale pull request approvals when new commits are pushed
  - [x] Require review from Code Owners (if CODEOWNERS file exists)

- [x] **Require status checks to pass before merging**
  - [x] Require branches to be up to date before merging
  - Status checks to require:
    - [ ] Backend Tests (pytest)
    - [ ] Frontend Tests (jest)
    - [ ] Build Success

- [x] **Require conversation resolution before merging**
  - All review comments must be resolved

- [x] **Require signed commits** (optional but recommended)

- [x] **Include administrators**
  - Apply rules to repository administrators

- [x] **Restrict who can push to matching branches**
  - Only allow specific users/teams to push

- [x] **Allow force pushes** - ❌ DISABLED
- [x] **Allow deletions** - ❌ DISABLED

#### Step 3: Save Changes
Click "Create" or "Save changes"

---

### For `development` Branch

**Recommended Settings:**
- [x] Require a pull request before merging
  - Require approvals: 1
- [x] Require status checks to pass
  - Backend tests
  - Frontend tests
- [x] Require conversation resolution
- [ ] Less strict than `main` to allow faster iteration

---

## GitHub Actions Workflow

### Create CI/CD Pipeline

**File:** `.github/workflows/ci.yml`

```yaml
name: CI/CD Pipeline

on:
  push:
    branches: [ main, development ]
  pull_request:
    branches: [ main, development ]

jobs:
  backend-tests:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Set up Python
      uses: actions/setup-python@v4
      with:
        python-version: '3.8'
    
    - name: Install dependencies
      run: |
        cd server
        pip install -r requirements.txt
    
    - name: Run tests
      run: |
        cd server
        pytest -v
      env:
        GROQ_API_KEY: ${{ secrets.GROQ_API_KEY }}
  
  frontend-tests:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Set up Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
    
    - name: Install dependencies
      run: |
        cd client
        npm install --legacy-peer-deps
    
    - name: Run tests
      run: |
        cd client
        npm test -- --watchAll=false
```

---

## CODEOWNERS File

**File:** `.github/CODEOWNERS`

```
# ReGen Code Owners

# Default owners for everything
* @Jeremymarube

# Backend
/server/ @Jeremymarube @Patrick

# Frontend
/client/ @Jeremymarube @lauren

# Documentation
/docs/ @Jeremymarube

# CI/CD
/.github/ @Jeremymarube
```

---

## Pull Request Template

**File:** `.github/PULL_REQUEST_TEMPLATE.md`

```markdown
## Description
<!-- Describe your changes in detail -->

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Checklist
- [ ] My code follows the project's style guidelines
- [ ] I have performed a self-review of my code
- [ ] I have commented my code where necessary
- [ ] I have updated the documentation
- [ ] My changes generate no new warnings
- [ ] I have added tests that prove my fix/feature works
- [ ] New and existing unit tests pass locally
- [ ] Any dependent changes have been merged

## Testing
<!-- Describe the tests you ran -->

## Screenshots (if applicable)
<!-- Add screenshots here -->

## Related Issues
<!-- Link related issues: Fixes #123 -->
```

---

## Gitflow Workflow

### Branch Naming Convention

```
feature/feature-name    - New features
bugfix/bug-description  - Bug fixes
hotfix/critical-fix     - Urgent production fixes
release/version-number  - Release preparation
```

### Workflow Steps

1. **Create Feature Branch**
   ```bash
   git checkout development
   git pull origin development
   git checkout -b feature/new-feature
   ```

2. **Make Changes & Commit**
   ```bash
   git add .
   git commit -m "feat: add new feature"
   ```

3. **Push to Remote**
   ```bash
   git push origin feature/new-feature
   ```

4. **Create Pull Request**
   - Go to GitHub
   - Click "New Pull Request"
   - Base: `development` ← Compare: `feature/new-feature`
   - Fill in PR template
   - Request reviewers

5. **Code Review**
   - Address review comments
   - Push additional commits if needed

6. **Merge to Development**
   - Once approved, merge PR
   - Delete feature branch

7. **Release to Main**
   ```bash
   # Create release PR
   git checkout main
   git pull origin main
   git merge development
   git push origin main
   ```

---

## Commit Message Convention

### Format
```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting)
- `refactor`: Code refactoring
- `test`: Adding/updating tests
- `chore`: Maintenance tasks

### Examples
```bash
feat(auth): add password reset functionality

fix(waste-logs): resolve pagination bug on mobile

docs(api): update Swagger documentation

test(backend): add tests for waste routes
```

---

## Verification Steps

### Check Current Protection Status

```bash
# Using GitHub CLI (if installed)
gh api repos/Jeremymarube/regen/branches/main/protection

# Or visit:
# https://github.com/Jeremymarube/regen/settings/branches
```

### Manual Verification Checklist

- [ ] Navigate to repository settings
- [ ] Click "Branches" in left sidebar
- [ ] Verify `main` branch has protection rules
- [ ] Verify `development` branch has protection rules
- [ ] Test by attempting direct push to `main` (should fail)
- [ ] Test PR workflow (should require approval)

---

## Current Status

### ⚠️ Action Required

**Branch protection rules need to be configured by repository owner:**

1. **Go to:** https://github.com/Jeremymarube/regen/settings/branches
2. **Add protection for `main` branch**
3. **Add protection for `development` branch**
4. **Set up GitHub Actions** (optional but recommended)
5. **Add CODEOWNERS file** (optional)

### Why Branch Protection Matters

✅ **Prevents accidental changes** to production code
✅ **Enforces code review** process
✅ **Ensures tests pass** before merging
✅ **Maintains code quality** standards
✅ **Protects against force pushes** and deletions
✅ **Creates audit trail** of all changes

---

## Team Collaboration Guidelines

### For Contributors

1. **Always work on feature branches**
2. **Keep branches up to date** with development
3. **Write descriptive commit messages**
4. **Request reviews** from appropriate team members
5. **Resolve conflicts** before requesting merge
6. **Delete branches** after merging

### For Reviewers

1. **Review code thoroughly**
2. **Test changes locally** if possible
3. **Provide constructive feedback**
4. **Approve only when satisfied**
5. **Check for breaking changes**

---

## Resources

- **GitHub Branch Protection:** https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-protected-branches
- **GitHub Actions:** https://docs.github.com/en/actions
- **Gitflow Workflow:** https://www.atlassian.com/git/tutorials/comparing-workflows/gitflow-workflow
- **Conventional Commits:** https://www.conventionalcommits.org/

---

**Last Updated:** October 29, 2025
**Status:** ⚠️ Awaiting configuration by repository owner
**Priority:** MEDIUM
