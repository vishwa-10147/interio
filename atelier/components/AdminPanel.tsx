"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";

type UserRecord = {
  id: string;
  name: string;
  email: string;
  project: string;
  status: string;
  city: string;
  phone: string;
  notes: string;
  avatar?: string;
};

const STORAGE_KEY = "verrant-admin-users";

const INITIAL_USERS: UserRecord[] = [
  {
    id: "user-1",
    name: "Aarav Mehta",
    email: "aarav.mehta@example.com",
    project: "Residence - Jubilee Hills",
    status: "Lead",
    city: "Hyderabad",
    phone: "+91 90000 12001",
    notes: "Looking for a warm minimal interior with a custom library wall.",
  },
  {
    id: "user-2",
    name: "Sana Kapoor",
    email: "sana.kapoor@example.com",
    project: "Apartment - Financial District",
    status: "Active",
    city: "Hyderabad",
    phone: "+91 90000 12002",
    notes: "Prefers a calm palette, natural light and concealed storage.",
  },
  {
    id: "user-3",
    name: "Imran Ali",
    email: "imran.ali@example.com",
    project: "Office - Kokapet",
    status: "Review",
    city: "Hyderabad",
    phone: "+91 90000 12003",
    notes: "Needs a reception, meeting room and a compact executive lounge.",
  },
];

function getInitials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");
}

export default function AdminPanel() {
  const [users, setUsers] = useState<UserRecord[]>(INITIAL_USERS);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as UserRecord[];
        if (Array.isArray(parsed) && parsed.length > 0) {
          setUsers(parsed);
        }
      }
    } catch {
      // Fallback to the in-memory seed data.
    } finally {
      setLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (!loaded) return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
  }, [loaded, users]);

  const stats = useMemo(() => {
    const active = users.filter((user) => user.status === "Active").length;
    const leads = users.filter((user) => user.status === "Lead").length;
    return [
      { label: "Total users", value: users.length.toString() },
      { label: "Active", value: active.toString() },
      { label: "Leads", value: leads.toString() },
    ];
  }, [users]);

  function updateUser(id: string, field: keyof UserRecord, value: string | undefined) {
    setUsers((current) =>
      current.map((user) => (user.id === id ? { ...user, [field]: value } : user))
    );
  }

  function removeUser(id: string) {
    setUsers((current) => current.filter((user) => user.id !== id));
  }

  function addUser() {
    setUsers((current) => [
      ...current,
      {
        id: crypto.randomUUID(),
        name: "New User",
        email: "new.user@example.com",
        project: "Unassigned project",
        status: "Lead",
        city: "Hyderabad",
        phone: "+91 90000 00000",
        notes: "Add brief context for this contact.",
      },
    ]);
  }

  function handleAvatarUpload(id: string, file: File | undefined) {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const result = typeof reader.result === "string" ? reader.result : undefined;
      if (result) {
        updateUser(id, "avatar", result);
      }
    };
    reader.readAsDataURL(file);
  }

  return (
    <section id="admin" className="relative border-t border-line py-28 sm:py-36">
      <div className="mx-auto max-w-[1600px] px-6 sm:px-10">
        <div className="mb-10 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="mb-6 flex items-center gap-3 font-mono text-[11px] uppercase tracking-widest2 text-stonemuted">
              <span className="h-1.5 w-1.5 rounded-full bg-brass" />
              Admin Panel
            </div>
            <h2 className="max-w-2xl font-display text-4xl text-stone sm:text-6xl">
              Edit every user detail from one dashboard.
            </h2>
            <p className="mt-5 max-w-2xl font-body text-sm leading-relaxed text-stonemuted">
              This panel keeps the user list local to the browser so you can
              test the workflow immediately. Name edits, avatar uploads and
              notes are saved in localStorage.
            </p>
          </div>

          <button
            type="button"
            onClick={addUser}
            className="inline-flex w-fit items-center gap-3 border border-brass px-6 py-3 font-mono text-[11px] uppercase tracking-widest2 text-brasslight transition-colors hover:bg-brass hover:text-ground"
          >
            Add User
            <span aria-hidden="true">+</span>
          </button>
        </div>

        <div className="grid gap-6 lg:grid-cols-[0.9fr_1.4fr]">
          <div className="corner-tick border border-line bg-surface/50 p-6 sm:p-8">
            <p className="font-mono text-[11px] uppercase tracking-widest2 text-brass">
              Directory Summary
            </p>
            <div className="mt-6 grid gap-4 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
              {stats.map((stat) => (
                <div key={stat.label} className="rounded-sm border border-line/70 bg-ground/40 p-4">
                  <p className="font-mono text-[11px] uppercase tracking-widest2 text-stonemuted">
                    {stat.label}
                  </p>
                  <p className="mt-2 font-display text-3xl text-stone">{stat.value}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 border-t border-line pt-6">
              <p className="font-mono text-[11px] uppercase tracking-widest2 text-brass">
                How to use
              </p>
              <ul className="mt-4 space-y-3 font-body text-sm leading-relaxed text-stonemuted">
                <li>Every field on each card is editable inline.</li>
                <li>Upload an avatar image or clear it back to initials.
                </li>
                <li>Changes are stored locally in this browser.</li>
              </ul>
            </div>
          </div>

          <div className="grid gap-4">
            {users.map((user) => (
              <motion.article
                key={user.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.45 }}
                className="corner-tick border border-line bg-surface/40 p-5 sm:p-6"
              >
                <div className="flex flex-col gap-6 xl:flex-row xl:items-start">
                  <div className="flex items-start gap-4">
                    <div className="flex h-20 w-20 items-center justify-center overflow-hidden rounded-sm border border-line bg-ground">
                      {user.avatar ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={user.avatar}
                          alt={user.name}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <span className="font-display text-2xl text-brasslight">
                          {getInitials(user.name)}
                        </span>
                      )}
                    </div>

                    <div>
                      <p className="font-mono text-[11px] uppercase tracking-widest2 text-brass">
                        User profile
                      </p>
                      <label className="mt-3 flex max-w-xs flex-col gap-2">
                        <span className="font-mono text-[11px] uppercase tracking-widest2 text-stonemuted">
                          Name
                        </span>
                        <input
                          value={user.name}
                          onChange={(e) => updateUser(user.id, "name", e.target.value)}
                          className="border-b border-line bg-transparent py-2 font-body text-stone outline-none transition-colors focus:border-brass"
                        />
                      </label>
                    </div>
                  </div>

                  <div className="grid flex-1 gap-4 sm:grid-cols-2">
                    <label className="flex flex-col gap-2">
                      <p className="font-mono text-[11px] uppercase tracking-widest2 text-stonemuted">
                        Email
                      </p>
                      <input
                        type="email"
                        value={user.email}
                        onChange={(e) => updateUser(user.id, "email", e.target.value)}
                        className="border-b border-line bg-transparent py-2 font-body text-stone outline-none transition-colors focus:border-brass"
                      />
                    </label>
                    <label className="flex flex-col gap-2">
                      <span className="font-mono text-[11px] uppercase tracking-widest2 text-stonemuted">
                        Status
                      </span>
                      <input
                        value={user.status}
                        onChange={(e) => updateUser(user.id, "status", e.target.value)}
                        className="border-b border-line bg-transparent py-2 font-body text-stone outline-none transition-colors focus:border-brass"
                      />
                    </label>
                    <label className="flex flex-col gap-2">
                      <p className="font-mono text-[11px] uppercase tracking-widest2 text-stonemuted">
                        Project
                      </p>
                      <input
                        value={user.project}
                        onChange={(e) => updateUser(user.id, "project", e.target.value)}
                        className="border-b border-line bg-transparent py-2 font-body text-stone outline-none transition-colors focus:border-brass"
                      />
                    </label>
                    <label className="flex flex-col gap-2">
                      <p className="font-mono text-[11px] uppercase tracking-widest2 text-stonemuted">
                        Contact
                      </p>
                      <input
                        type="tel"
                        value={user.phone}
                        onChange={(e) => updateUser(user.id, "phone", e.target.value)}
                        className="border-b border-line bg-transparent py-2 font-body text-stone outline-none transition-colors focus:border-brass"
                      />
                    </label>
                    <label className="flex flex-col gap-2">
                      <p className="font-mono text-[11px] uppercase tracking-widest2 text-stonemuted">
                        Location
                      </p>
                      <input
                        value={user.city}
                        onChange={(e) => updateUser(user.id, "city", e.target.value)}
                        className="border-b border-line bg-transparent py-2 font-body text-stone outline-none transition-colors focus:border-brass"
                      />
                    </label>
                    <label className="flex flex-col gap-2 sm:col-span-2">
                      <span className="font-mono text-[11px] uppercase tracking-widest2 text-stonemuted">
                        Notes
                      </span>
                      <textarea
                        value={user.notes}
                        onChange={(e) => updateUser(user.id, "notes", e.target.value)}
                        rows={3}
                        className="resize-none border-b border-line bg-transparent py-2 font-body text-stone outline-none transition-colors focus:border-brass"
                      />
                    </label>
                  </div>

                  <div className="flex flex-col gap-3 xl:w-52">
                    <label
                      htmlFor={`avatar-upload-${user.id}`}
                      className="inline-flex cursor-pointer items-center justify-center border border-brass px-4 py-3 text-center font-mono text-[11px] uppercase tracking-widest2 text-brasslight transition-colors hover:bg-brass hover:text-ground"
                    >
                      Upload Image
                    </label>
                    <input
                      id={`avatar-upload-${user.id}`}
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => handleAvatarUpload(user.id, e.target.files?.[0])}
                    />
                    <button
                      type="button"
                      onClick={() => updateUser(user.id, "avatar", undefined)}
                      className="border border-line px-4 py-3 font-mono text-[11px] uppercase tracking-widest2 text-stonemuted transition-colors hover:border-brass hover:text-brasslight"
                    >
                      Remove Image
                    </button>
                    <button
                      type="button"
                      onClick={() => removeUser(user.id)}
                      className="border border-line px-4 py-3 font-mono text-[11px] uppercase tracking-widest2 text-stonemuted transition-colors hover:border-red-400 hover:text-red-200"
                    >
                      Delete User
                    </button>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}