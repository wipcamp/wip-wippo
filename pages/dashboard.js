import React from 'react'
import Layout from '../components/layout/layout'
import { Grid } from 'semantic-ui-react'
import Portlet from '../components/util/portlet'
import Axios from 'axios'
import Moment from 'moment'

const differ = (start, end) => {
  const date = new Date()
  return Moment(end).diff(date, 'days')
}
class Index extends React.Component {
  state = {
    page: '',
    registerAmount: '',
    campData: []
  }
  componentWillMount = async () => {
    let data = await Axios.get('http://localhost:8000/api/v1/dashboard/')
    this.setState({
      registerAmount: data.data.data.registerTodayAmount,
      campData: data.data.data.campDetail
    })
  }
  render () {
    return (
      <Layout subheadertext='Dashboard'>
        <Grid.Row>
          <Grid.Column width={5}>
            <Portlet title='น้องใหม่ประจำวัน' herotext={this.state.registerAmount} image='/static/img/team.svg' />
          </Grid.Column>
          <Grid.Column width={5}>
            <Portlet title='ปิดรับสมัครใน' herotext={`${differ(this.state.campData.opened_at, this.state.campData.closed_at)} วัน`} image='/static/img/stopwatch.svg' />
          </Grid.Column>
        </Grid.Row>
      </Layout>
    )
  }
}
export default Index