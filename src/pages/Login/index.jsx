import React, {useState} from 'react';
import {NavBar} from "antd-mobile";
import styles from './index.module.css'
import {ErrorMessage, Field, Form, Formik} from 'formik';
import * as Yup from 'yup'
import {Link, useHistory, useLocation} from "react-router-dom";
import {useDispatch} from "react-redux";
import {AsyncGetToken} from "@/store/actions/UserAction";

let validate = Yup.object().shape({
    username: Yup.string().required('必填项!').matches(/^\w{3,12}$/, '格式不合法'),
    password: Yup.string().required('必填项!').matches(/^\w{3,12}$/, '格式不合法'),

})


function Index(props) {
    let dispatch = useDispatch()
    let location = useLocation()
    let [uname, setUname] = useState('test3')
    let [pwd, setPwd] = useState('test3')
    let history = useHistory()

    return (<div>
            <NavBar className={styles.navHeader}>用户登录</NavBar>
            {/* 登录表单 */}
            <Formik
                onSubmit={async (values) => {
                    await dispatch(AsyncGetToken(values))

                    if (location.state) {
                        history.replace(location.state.from)
                    } else {
                        history.push('/home/my')
                    }

                }}
                validationSchema={validate}
                validateOnBlur={true}
                validateOnChange={false}
                initialValues={
                    {
                        username: uname,
                        password: pwd,
                    }
                }
                validateForm={(e) => {
                    console.log(e)
                }}
            >
                {(props) => {
                    let {errors, touched} = props
                    return (<Form className={styles.form}>
                        <div className={styles.formItem}>
                            <Field
                                className={styles.input}
                                name="username"
                                placeholder="请输入账号"
                            />
                        </div>
                        <ErrorMessage name='username' component='div' className={styles.error}></ErrorMessage>
                        <div className={styles.formItem}>
                            <Field
                                className={styles.input}
                                name="password"
                                type="password"
                                placeholder="请输入密码"
                            />
                        </div>
                        <ErrorMessage name='password' component='div' className={styles.error}></ErrorMessage>
                        <div className={styles.formSubmit}>
                            <button className={styles.submit} type="submit">
                                登 录
                            </button>
                        </div>
                    </Form>)
                }}


            </Formik>

            <div className={styles.backHome}>
                <div>
                    <Link to="/registe">还没有账号，去注册~</Link>
                </div>
            </div>
        </div>
    );
}

export default Index;