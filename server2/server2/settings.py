"""
Django settings for server2 project.

Generated by 'django-admin startproject' using Django 4.2.9.

For more information on this file, see
https://docs.djangoproject.com/en/4.2/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/4.2/ref/settings/
"""

from pathlib import Path
import os
from os import getenv
from dotenv import load_dotenv

load_dotenv()

# Set NLTK data path

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent

# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/4.2/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = 'django-insecure-n(z3l#)i)ssrr7@cws4obmgb1ry@*f75l&g6#ut5_8vlk0x##r'

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True
MY_IP = os.getenv('MY_IP')
ALLOWED_HOSTS = ['127.0.0.1', 'localhost', '192.168.18.2',f"{MY_IP}"]  # Make sure your IP is added here

# Fetch MY_IP from environment variables


# CORS Settings
CORS_ALLOW_ALL_ORIGINS = False  # Disable this since you're specifying origins
CORS_ALLOWED_ORIGINS = [
    f"http://{MY_IP}:5173",  # Dynamically insert MY_IP
    'http://127.0.0.1:5173',  # Localhost fallback
    'http://localhost:5173',
]

# CSRF trusted origins
CSRF_TRUSTED_ORIGINS = [
    f"http://{MY_IP}:5173",  # Dynamically insert MY_IP
    'http://127.0.0.1:5173',
    'http://localhost:5173',
]

# CSRF_COOKIE settings
CSRF_COOKIE_HTTPONLY = False  # Allows JavaScript to access the cookie
CSRF_COOKIE_SAMESITE = 'Lax'  # Allows sending cookies on same-site or top-level navigation
CSRF_COOKIE_SECURE = False  # If you're using HTTP on localhost, set it to False

# CORS configuration for allowed methods and headers
CORS_ALLOW_CREDENTIALS = True
CORS_ALLOW_METHODS = [
    'DELETE',
    'GET',
    'OPTIONS',
    'PATCH',
    'POST',
    'PUT',
]

CORS_ALLOW_HEADERS = [
    "accept",
    "accept-encoding",
    "authorization",
    "content-type",
    "dnt",
    "origin",
    "user-agent",
    "x-csrftoken",
    "x-requested-with",
]

# Application definition
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'rest_framework',
    'corsheaders',  # CORS support
    'analytics',
]

MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',  # Ensure this comes first
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'server2.urls'

# Database configuration
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': getenv('PGDATABASE'),
        'USER': getenv('PGUSER'),
        'PASSWORD': getenv('PGPASSWORD'),
        'HOST': getenv('PGHOST'),
        'PORT': getenv('PGPORT', '5432'),
        'OPTIONS': {
            'sslmode': 'require',  # Keep this to enforce SSL, adjust as needed
        },
        'DISABLE_SERVER_SIDE_CURSORS': True,
    }
}

# Templating configuration
TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'server2.wsgi.application'

# Password validation
AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]

# Internationalization
LANGUAGE_CODE = 'en-us'
TIME_ZONE = 'UTC'
USE_I18N = True
USE_TZ = True

# Static files (CSS, JavaScript, Images)
STATIC_URL = 'static/'

# Default primary key field type
DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'
