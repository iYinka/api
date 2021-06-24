import React from 'react'

function ActivityOutput(props) {
  const Output = (props) => {
    const { menu, users, show } = props;

    if (users.length > 0) {
      return (
            (<div className='output' >
              {users.map((user, i) => {
                console.log(user);
                return (
                  <div className='output__info' key={user.id}>
                    <h1 >{i + 1}:</h1>
                    <span className='user__info'>
                      <div>Name: <p className='user__name'>{user.name}</p></div>
                      <div>Username: <p className='user__username'>{user.username}</p></div>
                      <div>Phone No.: <p className='user__name'>{user.phone}</p></div>
                      <div>Email Address: <p className='user__email'>{user.email}</p></div>
                      <div>Works At: <p className='user__email'>{user.company.name}</p></div>
                    </span>
                  </div>
                )
              })}
            </div>)
      )
    } else {
      <h1>NO USER IS FOUND!!!</h1>
    }
  }
  return (
    <>
      {Output(props)}
    </>
  )
}
export default ActivityOutput