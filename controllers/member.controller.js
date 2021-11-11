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
    fame: "Chari",
    mname: "Nethu",
    lame: "Asidni",
    phone: "0712334445",
    address: "Galle Road",
    userType: "School",
    
},
];

//Get the list of Members
exports.getMembers = (req, res) =>{
    res.send(members);
}
