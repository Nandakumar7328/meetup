import {Component} from 'react'
import Header from '../Header'

import RegisterContext from '../../context/RegisterContext'

import {
  RegisterContainer,
  RegisterImg,
  Form,
  RegisterHeading,
  InputContainer,
  Label,
  Input,
  Select,
  RegisterButton,
  ErrorMsg,
} from './styledComponents'

const topicsList = [
  {
    id: 'ARTS_AND_CULTURE',
    displayText: 'Arts and Culture',
  },
  {
    id: 'CAREER_AND_BUSINESS',
    displayText: 'Career and Business',
  },
  {
    id: 'EDUCATION_AND_LEARNING',
    displayText: 'Education and Learning',
  },
  {
    id: 'FASHION_AND_BEAUTY',
    displayText: 'Fashion and Learning',
  },
  {
    id: 'GAMES',
    displayText: 'Games',
  },
]

class Register extends Component {
  state = {initialSelect: topicsList[0].id}

  render() {
    const {initialSelect} = this.state
    return (
      <RegisterContext.Consumer>
        {value => {
          const {
            name,
            topic,
            changeName,
            changeTopic,
            showError,
            registerName,
            updateError,
          } = value

          const submitRegistration = event => {
            event.preventDefault()

            if (name !== '' && topic !== '') {
              const filterData = topicsList.find(
                eachFilter => eachFilter.id === initialSelect,
              )
              const {displayText} = filterData
              changeTopic(displayText)
              const {history} = this.props
              history.replace('/')
              registerName()
            } else {
              updateError()
            }
          }

          const onChangeName = event => {
            changeName(event.target.value)
          }

          const onChangeTopic = event => {
            this.setState({initialSelect: event.target.value})
          }

          return (
            <div>
              <Header />
              <div>
                <RegisterContainer>
                  <RegisterImg
                    src="https://assets.ccbp.in/frontend/react-js/meetup/website-register-img.png"
                    alt="website register"
                  />
                  <Form onSubmit={submitRegistration}>
                    <RegisterHeading>Let us join</RegisterHeading>
                    <InputContainer>
                      <Label htmlFor="name">NAME</Label>
                      <Input
                        id="name"
                        value={name}
                        type="text"
                        onChange={onChangeName}
                        placeholder="Your name"
                      />
                    </InputContainer>
                    <InputContainer>
                      <Label htmlFor="topic">Topics</Label>
                      <Select
                        id="topic"
                        value={initialSelect}
                        onChange={onChangeTopic}
                      >
                        {topicsList.map(each => (
                          <option value={each.id} key={each.id}>
                            {each.displayText}
                          </option>
                        ))}
                      </Select>
                    </InputContainer>
                    <RegisterButton type="submit">Register Now</RegisterButton>
                    {showError === true ? (
                      <ErrorMsg>Please enter your name</ErrorMsg>
                    ) : null}
                  </Form>
                </RegisterContainer>
              </div>
            </div>
          )
        }}
      </RegisterContext.Consumer>
    )
  }
}

export default Register
