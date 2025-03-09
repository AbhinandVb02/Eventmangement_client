import React, { useEffect, useState } from "react";
import { Breadcrumbs } from "../../components/Common/Breadcrumb";
import Table from "../../components/Common/Table";
import { CustomButton } from "../../components/CustomButton";
import API, { action } from "../../Api";
import CreateTasks from "../../components/Sheet/CreateTasks";
import { toast } from "react-toastify";

function Task() {
  const [tableData, setTableData] = useState([]);
  const [fullData, setFullData] = useState([]);
  const [activeTab, setActiveTab] = useState(1);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [taskIds, setTaskIds] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [totalTasks, setTotalTasks] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [taskData, setTaskData] = useState({});

  const userId = localStorage.getItem("user");
  const header = [
    { label: "Name", value: "name" },
    { label: "Description", value: "description" },
    { label: "Status", value: "status" },
  ];

  const getTask = async () => {
    try {
      const result = await action(API.GET_TASK_LIST, {
        type: activeTab,
        page: currentPage,
        count: 10,
      });

      if (result) {
        setFullData(result);
        setTotalPages(result.totalPages);
        setTotalTasks(result.totalTasks);
        setTableData(
          result.tasks.map((data) => ({
            _id: data._id,
            name: data.task_name,
            description: data.description,
            status: data.status == "public" ? "Global" : "Private",
            duration: data.duration,
            dependencies: data.dependencies,
            timing: data.timing,
            createdBy: data.createdBy,
          }))
        );
      }
    } catch (error) {
      console.error("Error fetching leave types:", error);
    }
  };

  const handleGetTaskIds = async () => {
    try {
      const result = await action(API.GET_TASK_IDS, {
        search: "",
      });

      if (result.data) {
        setTaskIds(
          result?.data.map((data) => ({
            value: data._id,
            label: data.task_name,
          }))
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTask();
    handleGetTaskIds();
  }, [activeTab, currentPage]);

  const handleAddTask = async (data) => {
    try {
      const result = await action(API.CREATE_TASK, {
        task_name: data.task_name,
        description: data.description,
        duration: data.duration,
        dependencies: data.dependencies,
        timing: data.timing,
        status: data.type == 1 ? "public" : "private",
        createdBy: userId,
      });

      if (result) {
        setDrawerOpen(false);
        getTask();
        toast.success("Task created successfully");
      }
    } catch (error) {
      toast.error("Something went wrong");
      console.error("Error adding task:", error);
    }
  };

  const handleDeleteTask = async (id) => {
    try {
      const result = await action(API.DELETE_TASK, {
        id: id,
        user_id: userId,
      });
      console.log(result);

      if (result) {
        toast.success("Task deleted successfully");
        getTask();
      }
    } catch (error) {
      toast.error(error.response.data.message);
      console.error("Error deleting task:", error);
    }
  };

  return (
    <div className="px-7 py-4 flex flex-col gap-5">
      <div className="flex item-center justify-between ">
        <Breadcrumbs
          title={"All Tasks "}
          description={"Manage your tasks here"}
        />
        <CustomButton
          children={"Create Tasks"}
          onClick={() => setDrawerOpen(true)}
        />
      </div>
      <div className="flex ">
        <button
          className={`py-2 px-4 font-medium ${
            activeTab === 1
              ? "text-blue-600 border border-blue-600 rounded-lg"
              : "text-gray-500 hover:text-gray-700"
          }`}
          onClick={() => {
            setActiveTab(1);
            setCurrentPage(1);
          }}
        >
          Global Tasks
        </button>
        <button
          className={`py-2 px-4 font-medium ${
            activeTab === 2
              ? "text-blue-600 border border-blue-600 rounded-lg"
              : "text-gray-500 hover:text-gray-700"
          }`}
          onClick={() => {
            setActiveTab(2);
            setCurrentPage(1);
          }}
        >
          Private Tasks
        </button>
      </div>
      <div>
        <Table
          header={header}
          data={tableData}
          totalPageCount={totalPages}
          totalCount={totalTasks}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          onEdit={(val) => {
            setDrawerOpen(true);
            setTaskData(val);
          }}
          onDelete={(id) => handleDeleteTask(id)}
        />
      </div>
      <CreateTasks
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        onSubmit={handleAddTask}
        options={taskIds}
        isData={taskData}
      />
    </div>
  );
}

export default Task;
