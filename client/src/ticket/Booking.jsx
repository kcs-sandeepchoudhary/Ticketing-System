import React, { useEffect, useMemo, useState } from "react";
import { Table, Input } from 'antd';
import Modalview from "../modal/Modalview";
import "../index.css"

const { Search } = Input;

const Booking = () => {
    const [searchdata, setSearchdata] = useState("")
    const [filterData, setFilterdata] = useState([])
    const [data, setData] = useState([])

    useEffect(() => {
        tableData()
        
    }, [])

    const tableData = async () => {
        try {
            let res = await fetch("http://localhost:4000/ticket/get_tickets")
            let _res = await res.json()
            console.log("_res", _res)
            setData(_res)
        }
        catch (e) {
            console.warn(e)
        }
    }

    const tdata = useMemo(() => {

        return data.map((result, index) => {

            return ({
                ticket_no: result._id,
                ticket_desc: result.ticket_desc,
                created_at: result.createdAt,
                updated_at: result.updatedAt
            })
        })
    })
    useEffect(() => {
        if (searchdata === "") {
            setFilterdata(tdata)
        } else {
            setFilterdata(() => tdata.filter(data => data.ticket_no?.toLowerCase().includes(searchdata.toLowerCase().trim()) ||
                data.ticket_desc?.toLowerCase().includes(searchdata.toLowerCase().trim())))
        }
    }, [tdata,searchdata])
    const columns = [
        {
            title: 'Ticket Number',
            dataIndex: 'ticket_no',
            key: 'ticket_no',

        },
        {
            title: 'Ticket Description',
            dataIndex: 'ticket_desc',
            key: 'ticket_desc',
        },
        {
            title: 'Created At',
            dataIndex: 'created_at',
            key: 'created_at',
        },
        {
            title: 'Updated At',
            dataIndex: 'updated_at',
            key: 'updated_at',
        },

        {
            title: 'DELETE',
            key: 'delete',
            // dataIndex: 'tags',
            render: (text, record) => (
                <a onClick={async () => {
                    console.log("record", record)
                    try {
                        let res = await fetch(`http://localhost:4000/ticket/del_ticket/${record.ticket_no}`, {
                            method: "Delete"

                        })
                    } catch (e) {
                        console.warn(e)
                    }
                    finally {
                        tableData()
                    }
                }} >Delete</a>
            )
        },

    ];
    const onSearch = (text) => {
        setSearchdata(text)
    }
    return (<>
        <div className="flex flex-direction-row flex-end">
            <Search
            style={{width:"300px"}}
                placeholder="saerch based on tik_desc.."
                allowClear
                enterButton="Search"
                size="large"
                onSearch={onSearch}
                onChange={({ target }) => {
                    onSearch(target.value)
                }}
            />
            <Modalview tableData={tableData} />
        </div>
        <div>
        <Table
            columns={columns}
            dataSource={filterData}
        />
        </div>
    </>)
}
export default Booking;