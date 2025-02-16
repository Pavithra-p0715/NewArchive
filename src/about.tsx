import { useState } from "react";
import { motion } from "framer-motion";
// import { Button } from "@/components/ui/button";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

type DataPoint = {
  name: string;
  value: number;
};

const data: DataPoint[] = [
  { name: "M", value: 24 },
  { name: "T", value: 16 },
  { name: "W", value: 18 },
  { name: "T", value: 20 },
  { name: "F", value: 30 },
  { name: "S", value: 36 },
  { name: "S", value: 22 },
];

export default function About() {
  return (
    <div className="bg-black text-white min-h-screen">
      {/* Navbar */}
      <nav className="flex justify-between items-center px-10 py-5 bg-black border-b border-gray-700">
        <h1 className="text-2xl font-bold text-green-400">Radar</h1>
        <ul className="hidden md:flex space-x-6">
          <li>Home</li>
          <li>About</li>
          <li>Products</li>
          <li>Contact</li>
        </ul>
        {/* <div className="space-x-4">
          <Button variant="outline">Sign Up</Button>
          <Button className="bg-green-400 text-black">Login</Button>
        </div> */}
      </nav>

      {/* Hero Section */}
      <section className="text-center px-10 py-20 md:py-32 bg-gradient-to-r from-black to-green-900">
        <h2 className="text-5xl font-bold">
          Our Cutting Edge <span className="text-green-400">Software</span>{" "}
          Solutions!
        </h2>
        <p className="mt-4 text-gray-300 max-w-2xl mx-auto">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
          viverra commodo felis nec egestas.
        </p>
        {/* <div className="mt-6 space-x-4">
          <Button className="bg-green-400 text-black">
            Start Your Free Trial
          </Button>
          <Button variant="outline">Play Video</Button>
        </div> */}

        {/* Chart Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="mt-12 mx-auto max-w-md bg-gray-800 p-6 rounded-lg"
        >
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={data}>
              <XAxis dataKey="name" stroke="#fff" />
              <YAxis stroke="#fff" />
              <Tooltip cursor={{ fill: "rgba(255,255,255,0.2)" }} />
              <Bar dataKey="value" fill="#32CD32" radius={[5, 5, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
      </section>
    </div>
  );
}
