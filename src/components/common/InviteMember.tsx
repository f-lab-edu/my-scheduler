"use client";

import { useState } from "react";

export default function InviteMember() {
  const [email, setEmail] = useState("");

  return (
    <div>
      <input
        name="Team Title"
        placeholder="New Title"
        className="mt-7 border-b-2 border-border-editor w-[500px] h-[40px] text-2xl outline-none"
        value={email}
        onChange={() => {}}
      />
      <div>
        <input placeholder="Member email" />
        <button
          onClick={() => {
            // TODO: 이메일 초대
          }}
        >
          Invite
        </button>
      </div>
    </div>
  );
}
