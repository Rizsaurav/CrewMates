import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../client";

export default function CrewmateForm() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    speed: "",
    color: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { data, error } = await supabase.from("crewmates").insert([form]);
    if (!error) navigate("/gallery");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input name="name" value={form.name} onChange={handleChange} placeholder="Name" className="input" />
      <input name="speed" value={form.speed} onChange={handleChange} placeholder="Speed" className="input" />
      <input name="color" value={form.color} onChange={handleChange} placeholder="Color" className="input" />
      <button type="submit" className="btn">Create</button>
    </form>
  );
}
