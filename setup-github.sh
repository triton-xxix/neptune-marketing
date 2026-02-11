#!/bin/bash
# GitHub Setup Script for Neptune Marketing Website
# Run this after creating the GitHub repository

echo "=========================================="
echo "Neptune Marketing - GitHub Setup"
echo "=========================================="
echo ""

# Check if remote already exists
if git remote get-url origin 2>/dev/null; then
    echo "⚠️  Remote 'origin' already exists."
    read -p "Do you want to update it? (y/n): " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        git remote remove origin
    else
        echo "Exiting without changes."
        exit 0
    fi
fi

echo "Enter your GitHub username:"
read USERNAME

REPO_URL="https://github.com/$USERNAME/neptune-marketing.git"

echo ""
echo "Setting up remote: $REPO_URL"
git remote add origin "$REPO_URL"

echo ""
echo "Pushing code to GitHub..."
git push -u origin main

echo ""
echo "=========================================="
if [ $? -eq 0 ]; then
    echo "✅ SUCCESS! Code pushed to GitHub."
    echo ""
    echo "Next steps:"
    echo "1. Visit: https://github.com/$USERNAME/neptune-marketing"
    echo "2. Edit in StackBlitz: https://stackblitz.com/github/$USERNAME/neptune-marketing"
    echo "3. Deploy to Vercel: https://vercel.com/new"
else
    echo "❌ Push failed. Please check:"
    echo "   - GitHub repository exists"
    echo "   - You have push access"
    echo "   - Your GitHub credentials are configured"
fi
echo "=========================================="
