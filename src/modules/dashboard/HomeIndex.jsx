import React, { useEffect, useState } from "react";
import { CustomButton } from "../../components/CustomButton";
import { CustomCard } from "../../components/CustomCard";
import { Activity, Edit, Ellipsis, MoreVertical, Trash } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import API, { action } from "../../Api";
import moment from "moment";

export const HomeIndex = () => {
  const navigate = useNavigate();
  const [countData, setCountData] = useState();
  const cardData = [
    {
      name: "Total Events",
      count: countData?.event_count,
      percentage: "87%",
    },
    {
      name: "Total Tasks",
      count: countData?.total_tasks,
      percentage: "87%",
    },
    {
      name: "Upcoming Events",
      count: countData?.upcoming_events,
      percentage: "87%",
    },
  ];

  const [tasks, setTasks] = useState([]);
  const [events, setEvents] = useState([]);

  const [openMenuId, setOpenMenuId] = useState(null);

  const toggleMenu = (id) => {
    setOpenMenuId(openMenuId === id ? null : id);
  };

  const handleEdit = (id) => {
    console.log(`Editing task ${id}`);
    setOpenMenuId(null);
  };

  const handleDelete = (id) => {
    console.log(`Deleting task ${id}`);
    setTasks(tasks.filter((task) => task.id !== id));
    setOpenMenuId(null);
  };

  const handleViewAllTasks = () => {
    navigate("/view_Task");
  };
  const handleViewAllEvents = () => {
    navigate("/view_Event");
  };

  const fetchData = async () => {
    try {
      const result = await action(API.GET_DASHBOARD);
      setTasks(result.taskData);
      setEvents(result.eventData);
      setCountData(result.counts);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between w-full">
        <h2 className="text-2xl 2xl:text-3xl font-semibold">Dashboard</h2>
        <CustomButton children={"New Event"} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {cardData.map((items, index) => (
          <div
            className="w-full min-h-[120px] bg-white rounded-lg shadow-md border border-gray-200 py-4 px-3 flex justify-between"
            key={index}
          >
            <div className="flex flex-col gap-1">
              <p className="text-xs 2xl:text-sm font-medium">{items.name}</p>
              <p className="text-sm 2xl:text-base font-extrabold">
                {items.count}
              </p>
              {/* <div>
                <span className="bg-blue-100 text-blue-600 text-xs font-medium px-2.5 py-1 rounded-full min-w-10 text-center">
                  {items.percentage}
                </span>
              </div> */}
            </div>
            <Activity size={18} />
          </div>
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div className="w-full bg-white rounded-lg shadow-md border border-gray-200 px-3 py-4 flex flex-col gap-4 ">
          {/* <h3 className="text-xl 2xl:text-xl font-semibold">Recent Tasks</h3> */}
          <div className="flex justify-between items-center">
            <h3 className="text-xl 2xl:text-xl font-semibold">Recent Tasks </h3>
            <button
              onClick={handleViewAllTasks}
              className="text-sm text-blue-600 hover:text-blue-800 font-medium cursor-pointer"
            >
              View All
            </button>
          </div>

          {tasks.map((task, index) => (
            <div
              key={index}
              className="w-full bg-white rounded-lg shadow-md border border-gray-200 flex justify-between items-center px-4 py-2"
            >
              <div className="flex flex-col gap-1">
                <p className="flex items-center gap-2">
                  <span className="text-xs 2xl:text-sm font-semibold">
                    {task.task_name}
                  </span>{" "}
                  <span
                    className={`rounded-full py-0.5 text-center px-2 text-[8px] 2xl:text-[10px] font-bold ${
                      task.status === "public" || task.status == 1
                        ? "bg-amber-200"
                        : "bg-blue-200"
                    }`}
                  >
                    {task.status == 1
                      ? "Public"
                      : task.status.charAt(0).toUpperCase() +
                        task.status.slice(1)}
                  </span>
                </p>
                <div>
                  <p className="text-gray-500 text-[10px] 2xl:text-xs">
                    {task.description}
                  </p>
                  <p className="text-gray-500 text-[10px] 2xl:text-xs">
                    {task.date}
                  </p>
                </div>
              </div>

              {/* {task.status !== "private" && (
                <div className="relative">
                  <button
                    onClick={() => toggleMenu(task.id)}
                    className="p-1 rounded-full hover:bg-gray-100"
                  >
                    <MoreVertical size={16} />
                  </button>

                  {openMenuId === task.id && (
                    <div className="absolute right-0 mt-1 w-32 bg-white border border-gray-200 rounded-md shadow-md z-10">
                      <button
                        onClick={() => handleEdit(task.id)}
                        className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        <Edit size={14} />
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(task.id)}
                        className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-gray-100"
                      >
                        <Trash size={14} />
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              )} */}
            </div>
          ))}
        </div>

        <div className="w-full bg-white rounded-lg shadow-md border border-gray-200 px-3 py-4 flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <h3 className="text-xl 2xl:text-xl font-semibold">
              Upcoming Events
            </h3>
            <button
              onClick={handleViewAllEvents}
              className="text-sm text-blue-600 hover:text-blue-800 font-medium cursor-pointer"
            >
              View All
            </button>
          </div>

          {events.map((event, index) => (
            <div
              key={index}
              className="w-full bg-white rounded-lg shadow-md border border-gray-200 flex justify-between items-center px-4 py-2"
            >
              <div className="flex flex-col gap-1">
                <p className="flex items-center gap-2">
                  <span className="text-xs 2xl:text-sm font-semibold">
                    {event.name}
                  </span>{" "}
                  <span className="bg-gray-200 rounded-full py-0.5 text-center px-2 text-[8px] 2xl:text-[10px] font-bold">
                    {moment(event.date).format("MMM DD")}
                  </span>
                </p>
                <div>
                  <p className="text-gray-500 text-[10px] 2xl:text-xs">
                    {event.description}
                  </p>
                  <p className="text-gray-500 text-[10px] 2xl:text-xs">
                    {moment(event.date).format("YYYY-MM-DD")}
                  </p>
                </div>
              </div>

              {/* <div className="relative">
                <button
                  onClick={() => toggleMenu(event.id)}
                  className="p-1 rounded-full hover:bg-gray-100"
                >
                  <MoreVertical size={16} />
                </button>

                {openMenuId === event.id && (
                  <div className="absolute right-0 mt-1 w-32 bg-white border border-gray-200 rounded-md shadow-md z-10">
                    <button
                      onClick={() => handleEdit(event.id)}
                      className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <Edit size={14} />
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(event.id)}
                      className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-gray-100"
                    >
                      <Trash size={14} />
                      Delete
                    </button>
                  </div>
                )}
              </div> */}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
