import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function Home() {
    const [data, setData] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [name, setName] = useState('');
    const [company, setCompany] = useState('');
    const [status, setStatus] = useState('');
    const [last_update, setLastUpdate] = useState('');
    const [notes, setNotes] = useState('');
    const [error, setShowError] = useState(false);
    const [showDropDown, setShowDropDown] = useState('');
    const [companyDropDown, setCompanyDropDown] = useState([]);
    const [statusDropDown, setStatusDropDown] = useState([]);
    const [selectedCompanies, setSelectedCompanies] = useState([]);
    const [selectedStatuses, setSelectedStatuses] = useState([]);

    const { email } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`/api/v1/users/${email}`).then(res => {
            if (!res.data.isAuthenticated) {
                navigate('/')
            }
        })
        fetchTableData();
    }, []);

    useEffect(() => {
        console.log(selectedCompanies, 'companies', selectedStatuses, 'statuses')

    })

    function fetchTableData() {
        axios.get('/api/v1/team_members',).then(res => {
            setData(res.data.data);
        })

    }

    useEffect(() => {
        let companyDropDown = [], statusDropDown = [];
        console.log(data, 'data')
        data.forEach(item => {
            companyDropDown.push(item.attributes.company);
            statusDropDown.push(item.attributes.status);
        })
        companyDropDown = [...new Set(companyDropDown)]
        statusDropDown = [...new Set(statusDropDown)]
        setCompanyDropDown(companyDropDown);
        setStatusDropDown(statusDropDown);
    }, [data]);

    const handleLogout = () => {
        axios.get(`/api/v1/users/${email}/edit`).then(res => {
            if (res.data.status === 200) {
                navigate('/')
            }
        })
    }

    function handleDelete(id) {
        console.log('Delete Started')
        axios.get(`/api/v1/team_members/${id}/edit`)
            .then(res => {
                if (res.data.status === 200) {
                    fetchTableData();
                }
            })
    }

    function displayMember(member) {

        return <tr key={member.id}>
            <td><input type={'checkbox'} name='select' value={member.id} /></td>
            <td key={member.attributes.name} >{member.attributes.name}</td>
            <td key={member.attributes.company} >{member.attributes.company}</td>
            <td key={member.attributes.status} >{member.attributes.status}</td>
            <td key={member.attributes.last_update} >{member.attributes.last_update}</td>
            <td key={member.attributes.notes} >{member.attributes.notes}</td>
            <td>
                <button onClick={() => handleDelete(member.id)}  ><img style={{ cursor: "pointer" }} src={'https://cdn-icons-png.flaticon.com/512/565/565491.png'} alt="Delete" width={20} height={20} /></button>
            </td>
        </tr>
    }

    const handleCreation = (event) => {
        event.preventDefault()
        axios.post('/api/v1/team_members', { team_member: { name, company, status, last_update, notes } })
            .then(res => {
                if (res.data.status === 200) {
                    fetchTableData();
                    setShowModal(false);
                }
                else if (res.data.status == 422) {
                    setShowError(true);
                }
            })
    }


    function displayModal() {
        return <div className="modal container">
            <div className="box">
                <div className="close" role={'presentation'} onClick={() => setShowModal(false)} ><img width={20} height={20} src={'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Grey_close_x.svg/512px-Grey_close_x.svg.png?20140617032513'} /></div>
                <h1>Create Member</h1>
                {error && <p className="error" >Member Already Exist With This Name</p>}
                <form>
                    <input type={'text'} onChange={event => setName(event.target.value)} name="Name" placeholder="Name" required />
                    <input type={'text'} onChange={event => setCompany(event.target.value)} name="Company" placeholder="Company" required />
                    <input type={'text'} onChange={event => setStatus(event.target.value)} name="Status" placeholder="Status" required />
                    <input type={'text'} onChange={event => setLastUpdate(event.target.value)} name="LastUpdate" placeholder="Last Update" required />
                    <input type={'text'} onChange={event => setNotes(event.target.value)} name="Notes" placeholder="Notes" required />
                    <button className="btn" onClick={handleCreation} >Create Member</button>

                </form>
            </div>
        </div>
    }

    const handleCheckBox = (event) => {
        console.log(event.target.value);
    }

    const hanldeCompanySelection = (event) => {
        let temp = []
        if (selectedCompanies.includes(event.target.value)) {
            temp = selectedCompanies.filter(item => item != event.target.value)
            setSelectedCompanies(temp);
        }
        else {
            setSelectedCompanies([...selectedCompanies, event.target.value])
        }
    }

    const handleStatusSelection = (event) => {
        let temp = []
        if (selectedStatuses.includes(event.target.value)) {
            temp = selectedStatuses.filter(item => item != event.target.value)
            setSelectedStatuses(temp);
        }
        else {
            setSelectedStatuses([...selectedStatuses, event.target.value])
        }
    }

    const handleSelectAll=(id)=>{
        let temp=[];
        if( id == 'company'){
            data.forEach(item => temp.push(item.attributes.company))
            setSelectedCompanies(temp);
        }
        else if( id == 'status')
        {   
            data.forEach(item => temp.push(item.attributes.status))
            setSelectedStatuses(temp);
        }   
    }

    return <div>
        {showModal && displayModal()}
        <button className="btn logout" onClick={handleLogout} >Logout</button>
        <div className="container">
            <div className="row header" >
                <h1>Team Members</h1>
                <button className="btn addMember" onClick={() => setShowModal(true)} >Add Members
                    <img style={{ paddingLeft: "5px" }} src={'https://icon-library.com/images/white-plus-icon/white-plus-icon-3.jpg'} width={20} height={20} alt="add" />
                </button>
            </div>
            <div className="row">
                <div className="row">
                    <div className="row dropDown" role={'presentation'} onClick={() => {

                        showDropDown == 'company' ? setShowDropDown('') : setShowDropDown('company')


                    }}>
                        <div>Company ({selectedCompanies.length})</div>
                        <div className="dropDownIcon"><img src={'https://cdn-icons-png.flaticon.com/512/32/32195.png'} width={15} height={15} alt='dropDown' /></div>
                        {showDropDown == 'company' && <div className="dropDownCard" >
                            {companyDropDown.length == 0 ? 'No Data' :
                                <div className="dropDownItem">
                                    <input type={'checkbox'} name={'selectAll'} value={'selectAll'} checked={selectedCompanies.length == data.length} onChange={() =>handleSelectAll('company')} />
                                    Select all
                                </div>
                            }
                            {companyDropDown.map(item => {
                                return <div className="dropDownItem" key={item} >
                                    <input type={'checkbox'} name={item} value={item} checked={selectedCompanies.includes(item)} onChange={hanldeCompanySelection} />
                                    {item}
                                </div>
                            })}
                        </div>}
                    </div>

                </div>
                <div className="row">
                    <div className="row dropDown" role={'presentation'} onClick={() => {
                        showDropDown == 'status' ? setShowDropDown('') : setShowDropDown('status')

                    }} >
                        <div>Status</div>
                        <div className="dropDownIcon"><img src={'https://cdn-icons-png.flaticon.com/512/32/32195.png'} width={15} height={15} alt='dropDown' /></div>
                        {showDropDown == 'status' && <div className="dropDownCard" >
                            {companyDropDown.length == 0 ? 'No Data' :
                                <div className="dropDownItem">
                                    <input type={'checkbox'} name="selectAll" value={'selectAll'} checked={selectedStatuses.length == data.length} onChange={()=>handleSelectAll('status')} />
                                    Select all
                                </div>
                            }

                            {statusDropDown.map(item => {
                                return <div className="dropDownItem" key={item} >
                                    <input type={'checkbox'} name={item} value={item} checked={selectedStatuses.includes(item)} onChange={handleStatusSelection} />
                                    {item}
                                </div>
                            })}
                        </div>}
                    </div>

                </div>

            </div>
            <table>
                <thead>
                    <tr>
                        <th><input type={'checkbox'} onChange={handleCheckBox} name='selectAll' value={'selectAll'} /></th>
                        <th>Name</th>
                        <th>company</th>
                        <th>Status</th>
                        <th>Last Update</th>
                        <th>Notes</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map(item => {
                        if (selectedCompanies.length != 0 || selectedStatuses.length != 0) {
                            if (selectedCompanies.includes(item.attributes.company) || selectedStatuses.includes(item.attributes.status)) {
                                return displayMember(item)

                            }

                        } else {
                            return displayMember(item)
                        }
                    })}
                </tbody>
            </table>
        </div>
    </div>
}