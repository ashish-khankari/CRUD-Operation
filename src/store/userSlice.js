import { createSlice } from '@reduxjs/toolkit'

//created Slice for user Data
export const userSlice = createSlice({
    name: "user",
    initialState: {
        userInformation: JSON.parse(localStorage.getItem("userData")) || [],
    },
    reducers: {
        addUser: (state, action) => {
            let usersAddedData = {
                ...action.payload,
                id: state.userInformation.length + 1
            }
            state.userInformation.push(usersAddedData)

            // Local Storage
            localStorage.setItem("userData", JSON.stringify(state.userInformation))
        },
        // to edit User
        editUser: (state, action) => {
            const { id, name, email, phone } = action.payload;
            const userIndex = state.userInformation.findIndex((user) => user.id === id);
          
            if (userIndex !== -1) {
              state.userInformation[userIndex] = { ...state.userInformation[userIndex], name, email, phone };
              localStorage.setItem('userData', JSON.stringify(state.userInformation));
            }
          },   
          
        //   Delete User
        deleteUser: (state, action) => {
            state.userInformation = state.userInformation.filter((item) => item.id != action.payload.id)
            console.log(action.payload)
            localStorage.setItem("userData", JSON.stringify(state.userInformation))
        }
    }
})

export const { addUser, editUser, deleteUser } = userSlice.actions;

export default userSlice.reducer
