import { Zoom, toast } from "react-toastify";

import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function TaskList() {
  
  const toastStyle = {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    transition: Zoom,
}

  return (
    <div>
      <h2>Task List</h2>
     
    </div>
  );
};


