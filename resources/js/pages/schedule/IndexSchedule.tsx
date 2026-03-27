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
  swine: Swine[];
}

interface Props {
  schedules: Schedule[];
}

export default function IndexSchedule({ schedules }: Props) {
  return (
    <>
      <Head title="Schedules" />
      <div className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-xl font-bold">Schedules</h1>
          <Link
            href="/schedules/create"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow"
          >
            + Create Schedule
          </Link>
        </div>

        {schedules.length === 0 ? (
          <p className="text-gray-500">No schedules found.</p>
        ) : (
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="p-2">Title</th>
                <th className="p-2">Date</th>
                <th className="p-2">Category</th>
                <th className="p-2">Swines</th>
                <th className="p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {schedules.map((schedule) => (
                <tr key={schedule.id} className="border-b">
                  <td className="p-2">{schedule.title}</td>
                  <td className="p-2">{schedule.date}</td>
                  <td className="p-2">{schedule.category}</td>
                  <td className="p-2">
                    {schedule.swine.map((s) => s.tag_number).join(", ")}
                  </td>
                  <td className="p-2">
                    <Link href={`/schedules/${schedule.id}`}>View</Link>
                     
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
}
