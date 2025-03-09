import React, { useEffect, useState } from "react";
import { Breadcrumbs } from "../../components/Common/Breadcrumb";
import Table from "../../components/Common/Table";
import { CustomButton } from "../../components/CustomButton";
import API, { action } from "../../Api";
import CreateEvents from "../../components/Sheet/CreateEvents";
import { toast } from "react-toastify";
import moment from "moment";

function AllEvents() {
  const [tableData, setTableData] = useState([]);
  const [fullData, setFullData] = useState([]);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [totalTasks, setTotalTasks] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const header = [
    { label: "Name", value: "name" },
    { label: "Description", value: "description" },
    { label: "Date", value: "date" },
  ];

  const getEvents = async () => {
    try {
      const result = await action(API.GET_EVENT_LIST, {
        page: 1,
        count: 10,
      });

      if (result) {
        console.log(result.data, "result");

        setTotalPages(result.totalPages);
        setTotalTasks(result.totalEvents);
        setFullData(result);
        setTableData(
          result.data?.map((data) => ({
            _id: data._id,
            name: data?.name,
            description: data?.description,
            date: moment(data.date).format("DD-MM-YYYY"),
          }))
        );
      }
    } catch (error) {
      console.error("Error fetching leave types:", error);
    }
  };

  useEffect(() => {
    getEvents();
  }, []);

  const handleSaveEvent = async (data) => {
    try {
      const result = await action(API.CREATE_EVENT, data);

      console.log(result);

      if (result) {
        toast.success("Event created successfully");
        getEvents();
      }
    } catch (error) {
      console.error("Error fetching leave types:", error);
    }
  };

  const handleDeleteEvent = async (id) => {
    try {
      const result = await action(API.DELETE_EVENT, {
        id: id,
      });
      console.log(result);

      if (result) {
        toast.success("Event deleted successfully");
        getEvents();
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
          title={"All Events "}
          description={"Manage your Events here"}
        />
        <CustomButton
          children={"Create Events"}
          onClick={() => setDrawerOpen(true)}
        />
      </div>

      <div>
        <Table
          header={header}
          data={tableData}
          view={true}
          totalPageCount={totalPages}
          totalCount={totalTasks}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          onDelete={(id) => handleDeleteEvent(id)}
        />
      </div>
      <CreateEvents
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        onSubmit={(val) => handleSaveEvent(val)}
      />
    </div>
  );
}

export default AllEvents;
