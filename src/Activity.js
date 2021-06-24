import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import './App.css'
import axios from 'axios'
import ActivityOutput from './ActivityOutput'

function Activity(res) {
  const [users, setUsers] = useState('')

  useEffect(() => {
    getUsers();
    // addUsers()
  }, []);

  const url = 'https://jsonplaceholder.typicode.com/'
  //Or const url = 'https://jsonplaceholder.typicode.com/users?_limit=5'

  

  
  //AXIOS GLOBALS .....to authenticate with token. Sample token copied from jwt.io
  axios.defaults.headers.common['X-Auth-Token'] = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';





  // GET REQUEST METHOD
  const getUsers = () => {
    // FIRST METHOD
    axios.get(`${url}users`, { params: { _limit: 5 }
    })
      .then((response) => {
        const allUsers = response.data;
        setUsers(allUsers)

        // SECOND METHOD
        // axios({ method: 'get', url: `${url}users`, params: { _limit: 5} })
        //   .then((response) => {
        //     const allUsers = response.data;
        //     setUsers(allUsers)
        // })
        // .then(res => console.log(res))
        // .catch(err => console.error(err))
      }
      )
  }

  
  // POST REQUEST METHOD
  const addUsers = () => {
    axios.post(`${url}users`, {
      data: {
        userId: 1,
        name: 'Omotunde Awe',
        phone: '09075205000',
        company: {
          name: 'Eunice & Victor Holdings'
        },
      }
    })
      .then((response) => {
        const addUser = response.data;
        console.log(addUser)
        // setUsers(addUser)
      })
      // .then(response => console.log(response))
      // .catch((err) => console.log(err))
  }

//UPDATE with either PUT or PATCH METHODS
  const updateUser = () => {
      axios.patch(`${url}users/1`, {
        name: 'Eunice Awe',
        phone: '080839930884',
        email: 'aweomotunde@gmail.com',
        company: {
          name: 'Eunice Fashions'
        },
    })
      .then((response) => {
        const addUser = response.data;
        console.log(addUser)
      })
  }

//DELETE REQUEST METHOD
    const removeUser = () => {
      axios.delete(`${url}users/1`)
      .then((response) => {
        const addUser = response.data;
        console.log(addUser)
      })
    }
  

  //SIMULTANUEOS REQUEST
  const getData = () => {
    axios.all([
      axios.get(`${url}todos?_limit=7`),
      axios.get(`${url}users`)
    ])
      .then(axios.spread((todos, users) => console.log(todos, users)))
      // OR output the response like this
      // .then(res => {
      //   console.log(res[0]);
      //   console.log(res[1]);
      //   setUsers(res[1]);
      // })
      .catch(err => console.error(err))
  }

  
  //CUSTOM HEADERS .....let's say the user must be logged in to make a custom header changes
  const customHeaders = () => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'sometoken'
      }
    }
    axios.post(`${url}todos`, {
        title: 'Omotunde Awe',
      
    },
      config
    )
      .then((response) => {
        const addUser = response.data;
        console.log(addUser)
      })
    .catch((err) => console.log(err))
  }
  

  //TRANSFORMING REQUESTS & RESPONSES
  const transformResponse = () => {
    const options = {
      method: 'post',
      url: `${url}todos`,
      data: {
        title: 'Hello there.....!!!!'
      },
      transformResponse: axios.defaults.transformResponse.concat(data => {
        data.title = data.title.toUpperCase();
        return data;
      })
    }

    axios(options).then(res => console.log(res))
  }

  

  //ERROR HANDLING
  const errorHandling = () => {
    axios.get(`${url}todoss`, {
      // validateStatus: function (status) {
      //   return status < 400; //Status = or > 500 will be rejected
      // }
    })
      .then((response) => {
        const allUsers = response.data;
        console.log(allUsers)
      })
      .catch(err => {
        if (err.response) {
          //Server response with status other than 200 range
          console.log(err.response.data);
          console.log(err.response.status);
          console.log(err.response.headers);
          if (err.response.status === 404) {
            alert('OOoooppsss!!!! Page not available')
          }
        } else if (err.request) {
          //Request made but no response
          console.error(err.request);
        } else {
          console.error(err.message);
        }
      });
  }


  
  //CANCEL TOKEN
  const cancelToken = () => {
    const source = axios.CancelToken.source()

    axios.get(`${url}todos`, {
      cancelToken: source.token
    })
      .then((response) => {
        const allUsers = response.data;
        // setUsers(allUsers)
        console.log(allUsers);
      })
      .catch(thrown => {
        if (axios.isCancel(thrown)) {
          console.log('Request canceled', thrown.message);
        }
      });
    if (true) {
      source.cancel('Request is canceled')
    }
  }


  // INTERCEPTING REQUESTS & RESPONSES which shows axios actions
  axios.interceptors.request.use(config => { 
    console.log(`${config.method.toUpperCase()} request sent to ${config.url} at ${new Date().getTime()}`);
      return config
  }, error => {
      return Promise.reject(error)
  });



  
  //AXIOS INSTANCE
  // const axiosInstance = axios.create({
  //     baseURL: 'https://jsonplaceholder.typicode.com/'
  // })

  // axiosInstance.get('/comments?_limit=5').then(res => console.log(res)); ////Runs immediately



  return (
    <div className='activity'>
      <div className='buttons'>
        <button onClick={() =>getUsers()} style={{backgroundColor: '#39A2DB'}}>Get</button>
        <button onClick={() => addUsers()} style={{backgroundColor: '#66DE93'}}>POST</button>
        <button onClick={() => updateUser()} style={{backgroundColor: '#FFC074'}}>PUT/PATCH</button>
        <button onClick={() => removeUser()} style={{backgroundColor: '#F54748'}}>DELETE</button>
        <button onClick={() => getData()} style={{backgroundColor: ''}}>Sim Requests</button>
        <button onClick={() => customHeaders()} style={{backgroundColor: ''}}>Custom Headers</button>
        <button onClick={() => transformResponse()} style={{backgroundColor: ''}}>Transform</button>
        <button onClick={() => errorHandling()} style={{backgroundColor: ''}}>Error Handling</button>
        <button onClick={() => cancelToken()} style={{backgroundColor: ''}}>Cancel</button>
      </div>

      
      <ActivityOutput users={users} />

      <Link to='/' >
        <h4 className='Go_To_Home'>Go To Home</h4>  
      </Link>

      <div>
        {/* <h5>{res.status}</h5> */}
      </div>
      <div>
        {/* <pre>{JSON.stringify(res.headers, null, 2)}</pre> */}
      </div>

      <div>
        {/* <pre>{JSON.stringify(res.data, null, 2)}</pre> */}
      </div>

      <div>
        {/* <pre>{JSON.stringify(res.config, null, 2)}</pre> */}
      </div>
    </div>
  )
}

export default Activity
