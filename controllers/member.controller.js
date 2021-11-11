let members = [{
    id: "1",
    nic: "985867143V",
    fame: "Dinusha",
    mname: "Sanda",
    lame: "Ruwani",
    phone: "0771111111",
    address: "kandy road",
    userType: "University",
    
},
{
    id: "2",
    nic: "200000123V",
    fname: "Chari",
    mname: "Nethu",
    lname: "Asidni",
    phone: "0712334445",
    address: "Galle Road",
    userType: "School",
    
},
];

//Get the list of Members
exports.getMembers = (req, res) =>{
    res.send(members);
};

// Get a single Member
exports.getMember = (req, res) =>{
    const id = req.params.id;
    const member = members.find((member) => member.id === id);
    console.log(member);
    res.send(member);
};

// Create Member 
// nic, fname, mname,lname,phone,address,userType
exports.addMember = (req, res) =>{
    const {nic, fname, mname,lname,phone,address,userType} = req.body;
    
    const member = {
        id: Math.random().toString(16).slice(2),
        nic,
        fname,
        mname,
        lname,
        phone,
        address,
        userType,
    };
    members.push(member);
    res.send(member);   
};

//Update Member Details
exports.editMember = (req, res) =>{
    const id = req.params.id;
    const {nic, fname, mname,lname,phone,address,userType} = req.body;

    const memberIndex = members.findIndex((member) => member.id ===id);
    members[memberIndex] = {
        ...members[memberIndex],
        nic,
        fname,
        mname,
        lname,
        phone,
        address,
        userType,
    }

    res.send(members[memberIndex]);
};


