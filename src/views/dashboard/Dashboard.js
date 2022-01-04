import {
  cilUser,
} from '@coreui/icons';
import CIcon from '@coreui/icons-react';
import {
  CCard,
  CCardBody, CCardHeader,
  CCol, CRow,
  CButton,
  CListGroup,
  CListGroupItem,
  CModal,
  CModalBody,
  CModalFooter,
  CModalTitle,
  CModalHeader,
  CSpinner,
  CAlert
} from '@coreui/react';
import React, { useContext, useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { GlobalContext } from "../../context";
import moment from "moment";
import Pagination from '@mui/material/Pagination';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import XlsExport from 'xlsexport';
import _nav from 'src/_nav';
import io from "socket.io-client";

const Dashboard = () => {
  const { auth } = useContext(GlobalContext);
  const [users, setUsers] = useState(null);
  const [visible, setVisible] = useState(false);
  const [detail, setDetail] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [userPerPage, setUserPerPage] = useState(8);
  const [message, setMessage] = useState(null);

  const indexOfLastPost = currentPage * userPerPage;
  const indexOfFirstPost = indexOfLastPost - userPerPage;
  const currentPosts = users?.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = pageNumber => setCurrentPage(pageNumber);
  let socket;
  let ENDPOINT = "http://localhost:5000/";
  // let ENDPOINT="https://pure-island-16777.herokuapp.com/";

  useEffect(() => {
    getAllUser();
  }, [])

  useEffect(() => {
    socket = io(ENDPOINT);
    socket.emit("join", auth?.user?._id);
  }, [])

  const getAllUser = () => {
    fetch('http://147.182.142.76:5000/api/getUsers',
      { method: 'GET' },
    )
      .then(res => res.json())
      .then(data => {
        if (!data.message) {
          setUsers(data);
        }
      })
  }

  const SaveAsExcelFormatXlsx = () => {
    users?.forEach(item => {
      delete item._id;
      delete item.password;
      delete item.role;
      delete item.__v;
      delete item.isBan;
    });
    const xls = new XlsExport(users, 'Example WB');
    xls.exportToXLS('export.xls');
  };

  return (
    <>
      {auth === null && <Redirect to="/login" />}
      {users === null && <CSpinner />}
      <CRow>
        <CCol xs>
          <CCard className="mb-4">
            <CCardHeader>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                {
                  users &&
                  <span>{`Registered Users (${users?.length})`}</span>
                }
                <CloudDownloadIcon title="Export to Excel" color="success"
                  onClick={SaveAsExcelFormatXlsx}
                />
              </div>
            </CCardHeader>
            <CCardBody>
              <CListGroup>
                {
                  users?.length === 0 && <h6 style={{ textAlign: 'center', color: 'red' }}>No Registered User</h6>
                }
                {
                  currentPosts?.map((item, index) => {
                    return <>
                      <CListGroupItem key={index} onClick={() => {
                        setDetail(item);
                        setVisible(true);
                      }} key={index} style={{ cursor: 'pointer' }}>
                        <CIcon icon={cilUser} style={{ marginRight: '10px' }} /> {item.name}
                      </CListGroupItem>
                    </>
                  })
                }
              </CListGroup>
            </CCardBody>
          </CCard>
        </CCol>
        {
          users?.length !== 0 &&
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Pagination count={Math.ceil(users?.length / userPerPage)} onChange={(e, v) => paginate(v)} color="primary" />
          </div>
        }
      </CRow>
      {/* modal */}
      <CModal alignment="center" visible={visible} onClose={() => setVisible(false)}>
        <CModalHeader>
          <CModalTitle>User Detail</CModalTitle>
        </CModalHeader>
        <CModalBody>
          {
            message &&
            <CAlert color="success">
              {message}
            </CAlert>
          }
          <div style={{ textAlign: 'center' }}>
            <CIcon size={'3xl'} icon={cilUser} style={{ marginRight: '1rem', marginBottom: '1rem' }} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span><b>Name :</b> {detail?.name}</span>
            <span><b>Surname :</b> {detail?.surname}</span>
            <span><b>DOB :</b> {detail?.dob}</span>
            <span><b>Register Date :</b> {moment(detail?.createdAt).format('ll')}</span>
          </div>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setVisible(false)}>
            Close
          </CButton>
          {
            detail?.isBan ?
              <CButton color="primary"
                onClick={() => {
                  fetch('http://147.182.142.76:5000/api/userUnban', {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ id: detail?._id })
                  })
                    .then(res => res.json())
                    .then(data => {
                      if (data.success) {
                        setMessage(data.success);
                        setTimeout(() => {
                          setMessage(null);
                          setVisible(false);
                        }, 2000);
                      }
                      getAllUser();
                    })
                }}
              >UnBan</CButton>
              :
              <CButton color="primary" onClick={() => {
                fetch('http://147.182.142.76:5000/api/userBan', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json'
                  },
                  body: JSON.stringify({ id: detail?._id })
                })
                  .then(res => res.json())
                  .then(data => {
                    if (data.success) {
                      setMessage(data.success);
                      setTimeout(() => {
                        setMessage(null);
                        setVisible(false);
                      }, 2000);
                      getAllUser();
                    }
                  })
              }}>Ban User</CButton>
          }
        </CModalFooter>
      </CModal>
    </>
  )
}

export default Dashboard;