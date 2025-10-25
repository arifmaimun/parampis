#!/bin/bash

# Script to switch between development (SQLite) and production (PostgreSQL) Prisma schemas

case "$1" in
  "dev"|"development")
    echo "🔄 Switching to development mode (SQLite)..."
    cp prisma/schema.sqlite.prisma prisma/schema.prisma
    echo "✅ Using SQLite schema for development"
    echo "📝 Run 'npx prisma generate' to update Prisma client"
    ;;
  "prod"|"production")
    echo "🔄 Switching to production mode (PostgreSQL)..."
    cp prisma/schema.postgresql.prisma prisma/schema.prisma
    echo "✅ Using PostgreSQL schema for production"
    echo "📝 Run 'npx prisma generate' to update Prisma client"
    ;;
  *)
    echo "Usage: $0 {dev|prod}"
    echo "  dev  - Switch to development mode (SQLite)"
    echo "  prod - Switch to production mode (PostgreSQL)"
    exit 1
    ;;
esac

