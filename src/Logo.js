import React  from 'react'
import { Input } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import './App.css'
import {Link} from 'react-router-dom'


function Logo() {
  // const history = useHistory();
  // const [values, setValues] = useState({
  //   email: '',
  //   password: ''
  // })

  // const SignIn = e => {
  //   e.preventDefault();
  //   history.push('/activity')
  // }

  // const handleChange = (name) => ({target}) => {
  //   setValues({
  //     ...values,
  //     [name]: target.value
  //     })
  // }
  return (
    <div className='input'>
      <Input placeholder='Enter email'
        // value={values.email}
        // onChange={handleChange('email')} 
        
        />
      <Input.Password
        // value={values.password}
      placeholder="Enter password"
        iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
        // onChange={handleChange('password')}
      />
      <Link to='/activity'>
              <button >Log in...</button>

      </Link>
    </div>
  )
}

export default Logo
