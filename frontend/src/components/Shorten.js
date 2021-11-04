import React, { useState, useEffect } from 'react'
import { Container, Row, Col, Form } from 'react-bootstrap'
import axios from 'axios'
import validator from 'validator'
import './Shorten.css'

export default function Shorten() {
  const [url, setUrl] = useState('')
  const [link, setLink] = useState('')

  const handleChange = (e) => {
    e.persist()
    setUrl(e.target.value)
  }

  const handleLinkChange = (e) => {
    e.persist()
    setLink(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const validURL = validator.isURL(url, { require_protocol: true })

    if (!validURL) {
      alert(
        'Please check provided url and includes the http(s) protocol'
      )
    } else {

      axios
        .post('http://localhost:5000/api/v1/url/create', { longUrl: url })
        .then((res) => {
          setLink(`http://localhost:3000/redirect/${res.data.data.hash}`)
        })
        .catch((err) => console.log(err.message))
    }
  }

  useEffect(() => {
  }, [url])

  return (
    <div className="App">
      <Container>
        <Row className="align-items-center vertical-center">
          <Col>
            <Form onSubmit={handleSubmit} className="form-group">
              <Container>
                <Row className="justify-content-center">
                  <Col xs={12} md={6} className="text-center my-2 p-0">
                    <input
                      className="form-control w-100 inputStyle"
                      type="text"
                      name="url"
                      placeholder="Enter URL including the http protocol"
                      onChange={handleChange}
                    />
                  </Col>
                  <Col xs={12} md={2} className="text-center my-2 p-0">
                    <input
                      className="btn btn-warning btn-block btnStyle"
                      type="submit"
                      value="Generate"
                    />
                  </Col>
                </Row>
              </Container>


              <Container>
                <Row className={link !== ''
                  ? 'display-shorturl justify-content-center'
                  : 'hide-shorturl'
                }
                >
                  <Col xs={12} md={9} className="text-center py-5">
                    <a href={link} target="_blank" rel="noreferrer">
                      <span id="shorturl" onChange={handleLinkChange}>
                        {link}
                      </span>
                    </a>
                  </Col>
                </Row>
              </Container>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  )
}