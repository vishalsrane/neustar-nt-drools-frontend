import axios from "axios";


const getAllDn = async () => {
    const axisReposnse = await axios.get("http://localhost:9999/directory-number");
    axisReposnse.data.map(dn => {
        const userData = dn.userData
        const modifiedUserData = []
        userData.forEach(ud => {
            modifiedUserData.push({id: ud.id, [ud.userDataType.userDataKey]: ud.userData})
        });
        dn.userData = modifiedUserData
    })

    return axisReposnse.data
}

const performAction = async (dnId: Number, action: String) => {
    const axisReposnse = await axios.get(`http://localhost:9999/directory-number/id/${dnId}/action?action=${action}`);
}


export {getAllDn, performAction}