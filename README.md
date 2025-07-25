# Delta State Certificate of Origin Portal

A modern, responsive web application for managing and applying for Local Government and State of Origin certificates in Delta State, Nigeria.

## Features

- **User Registration & Login:** Secure authentication for citizens and admins.
- **Online Application:** Apply for certificates from anywhere, anytime.
- **Minor Applications:** Parents/guardians can apply for minors without NIN.
- **Admin Dashboard:** Manage, review, and approve/reject applications.
- **Status Tracking:** Users can track the status of their applications.
- **Digital Certificates:** Download and print certificates after approval.
- **Responsive UI:** Beautiful, mobile-friendly design with Tailwind CSS.
- **Search & Filter:** Quickly find applications and LGAs.
- **Accessibility:** Designed for all users, including those with disabilities.

## Tech Stack

- **Frontend:** React, TypeScript, Vite
- **Styling:** Tailwind CSS
- **Icons:** Lucide React
- **Routing:** React Router DOM

## Getting Started

1. **Clone the repository:**
   ```bash
   git clone https://github.com/victoroyoma/lgacert.git
   cd lgacert
   ```
2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Start the development server:**
   ```bash
   npm run dev
   ```
4. **Open in your browser:**
   Visit [http://localhost:5173](http://localhost:5173) (or the port shown in your terminal).

## Usage

- **Register** as a new user or login with your credentials.
- **Apply** for a certificate by filling out the application form.
- **For minors:** Select the minor application option and provide guardian details.
- **Admins** can login (use an email containing `admin`) to access the admin dashboard.
- **Track** your application status and download your certificate when approved.

## Project Structure

```
├── src/
│   ├── components/         # Reusable UI components
│   ├── context/            # Auth and global context
│   ├── pages/              # Main app pages (Home, Dashboard, Admin, etc.)
│   ├── index.tsx           # App entry point
│   └── index.css           # Tailwind CSS imports
├── public/
├── package.json
├── tailwind.config.js
├── vite.config.ts
└── README.md
```

## Customization

- **LGAs:** Update the list of supported LGAs in `Home.tsx` as needed.
- **Branding:** Replace logos and colors in `Header.tsx` and Tailwind config.
- **API Integration:** Replace mock data with real API calls for production use.

## Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

## License

[MIT](LICENSE)

---

Built with ❤️ for Delta State by [Victor Oyoma](https://github.com/victoroyoma) and contributors.
