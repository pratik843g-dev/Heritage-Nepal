# 🚀 GitHub Setup Guide

Follow these steps to push your Nepal Heritage Explorer project to GitHub.

## ✅ Prerequisites

Your project is already:
- ✓ Git initialized
- ✓ All files committed
- ✓ Ready to push to GitHub

## 📦 Option 1: Using GitHub Website (Recommended)

### Step 1: Create a New Repository

1. Go to [GitHub](https://github.com)
2. Click the **"+"** icon in the top right → **"New repository"**
3. Fill in the details:
   - **Repository name**: `nepal-heritage-explorer`
   - **Description**: `A modern web app for exploring Nepal's heritage sites with QR code scanning`
   - **Visibility**: Choose **Public** or **Private**
   - **DO NOT** initialize with README, .gitignore, or license (we already have these)
4. Click **"Create repository"**

### Step 2: Push Your Code

GitHub will show you commands. Use these in your terminal:

```bash
# Add the remote repository
git remote add origin https://github.com/YOUR_USERNAME/nepal-heritage-explorer.git

# Rename branch to main (if needed)
git branch -M main

# Push your code
git push -u origin main
```

**Replace `YOUR_USERNAME` with your actual GitHub username!**

## 🔧 Option 2: Using GitHub CLI (If Installed)

If you have GitHub CLI installed (`gh`), you can create and push in one command:

```bash
# Login to GitHub (first time only)
gh auth login

# Create repo and push
gh repo create nepal-heritage-explorer --public --source=. --remote=origin --push
```

## 🎯 Quick Terminal Commands

Open your terminal in the project directory and run:

```bash
# Check git status
git status

# Add remote (replace YOUR_USERNAME)
git remote add origin https://github.com/YOUR_USERNAME/nepal-heritage-explorer.git

# Check remote was added
git remote -v

# Push to GitHub
git push -u origin main
```

If you get an error about "master" vs "main" branch:

```bash
# Rename branch to main
git branch -M main

# Then push
git push -u origin main
```

## 🔐 Authentication

### Using HTTPS (Recommended for beginners)

When pushing, you'll be prompted for credentials:
- **Username**: Your GitHub username
- **Password**: Use a **Personal Access Token** (not your account password)

#### Creating a Personal Access Token:
1. Go to GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
2. Click "Generate new token (classic)"
3. Give it a name: `Nepal Heritage Explorer`
4. Select scopes: Check **`repo`** (full control of private repositories)
5. Click "Generate token"
6. **Copy the token** (you won't see it again!)
7. Use this token as your password when pushing

### Using SSH (Alternative)

If you prefer SSH:
1. [Generate an SSH key](https://docs.github.com/en/authentication/connecting-to-github-with-ssh)
2. Add it to your GitHub account
3. Use SSH remote URL instead: `git@github.com:YOUR_USERNAME/nepal-heritage-explorer.git`

## ✨ After Pushing

Your repository will include:
- ✅ All source code
- ✅ Documentation (README, CONTRIBUTING, etc.)
- ✅ License (MIT)
- ✅ Changelog
- ✅ Project structure
- ✅ Properly configured .gitignore

## 🌟 Next Steps

1. **Add Topics**: On GitHub, click the ⚙️ icon and add topics:
   - `nepal`
   - `heritage`
   - `qr-code`
   - `react`
   - `vite`
   - `tailwindcss`

2. **Add Description**: Make sure your repo has a good description

3. **Enable GitHub Pages** (optional): If you want to host documentation

4. **Set up branch protection** (optional): Protect your main branch

## 🐛 Troubleshooting

### "Remote origin already exists"
```bash
git remote remove origin
git remote add origin https://github.com/YOUR_USERNAME/nepal-heritage-explorer.git
```

### "Failed to push some refs"
```bash
# Pull first, then push
git pull origin main --allow-unrelated-histories
git push -u origin main
```

### Authentication Failed
- Make sure you're using a Personal Access Token, not your password
- Check that the token has `repo` scope
- Verify your username is correct

## 📝 Repository URL Structure

Your repository will be available at:
```
https://github.com/YOUR_USERNAME/nepal-heritage-explorer
```

Clone URL:
```
https://github.com/YOUR_USERNAME/nepal-heritage-explorer.git
```

---

**Need help?** Check [GitHub's documentation](https://docs.github.com/en/get-started/quickstart/create-a-repo) or open an issue!
