# CoachBase

**!Note**: Right now the AWS people decided to freeze my account with the S3 bucket, so the image uploads are not working correctly, I'm working on a fix.

## Table of Contents

- [Overview](#overview)
- [Technical Details](#technical-details)
- [Getting Started](#getting-started)
- [Conclusion](#conclusion)

## Overview

CoachBase is an online platform designed to connect trainers with potential clients. Built with [Next.js](https://nextjs.org/), this application provides a solution for trainers to market their services online, similar to platforms like LinkedIn.

Coaches can create customized profiles with the ability to add essential info, like **their city**, **areas of expertise**, **tags** (like powerlifting, weightlifting, physical preparedness, etc.) and a **short description** visible in search results. In addition to simple info, they can add more complex things like a rich-text description, client testimonials, experience section and informational articles to show their knowledge. This was achieved with an easy-to-use profile interface visible at. they can add [Profile](https://coachbase.pl/profil) after logging in.

**To create a business account** the trainer first creates a request, that is then verified by the admin. Once the account is accepted, the trainer can begin to edit their profile info.

Clients can **search** for trainers by city or areas of expertise. Once they find an interesting result, they can look more into the trainer profile. After working with a coach, they can also leave a review on his account.

## Technical Details

The project is built using `Next.js 13 App Router` with `TypeScript` for type safety and Zod for client-side validation.

`MongoDB` is used as the database, models reside in the `src/model` directory. AWS S3 was used for image storage but right now my account is frozen and they are not showing.

The application also includes full authentication with features expected by clients like password reset.

In the future there is a possibility of creating a newsletter which you can sign up to right now, Nodemailer is used for sending emails.

On the frontend, the application provides features like **rich text editors**, **combobox** for searching or **multiselect** for tags in the trainer profile.

## Getting Started

To get the app working locally, replace variables in .env.example with your real keys and change the name to .env.local. Install dependencies with `npm i` and run the development server with `npm run dev`. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
