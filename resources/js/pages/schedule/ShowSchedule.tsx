import React from "react";
import { Head, Link, usePage } from "@inertiajs/react";

interface Swine {
  id: number;
  tag_number: string;
}

interface Schedule {
  id: number;
  title: string;
  date: string;
  category: string;
  description: string;
  swine: Swine[];
}

interface Props {
  schedule: Schedule;
}

export default function ShowSchedule({ schedule }: Props) {
  return (
    <>
      <Head title={`Schedule - ${schedule.title}`} />
      <div className="p-6 max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold mb-2">{schedule.title}</h1>
        <p className="text-gray-600 mb-4">{schedule.date}</p>
        <p className="mb-2"><strong>Category:</strong> {schedule.category}</p>
        <p className="mb-4">{schedule.description}</p>

        <h2 className="font-semibold mb-2">Assigned Swines</h2>
        <ul className="list-disc pl-6">
          {schedule.swine.map((swine) => (
            <li key={swine.id}>{swine.tag_number}</li>
          ))}
        </ul>

        <div className="mt-6">
          <Link
            href="schedules/index"
            className="text-blue-600 hover:underline"
          >
            ← Back to Schedules
          </Link>
        </div>
      </div>
    </>
  );
}
