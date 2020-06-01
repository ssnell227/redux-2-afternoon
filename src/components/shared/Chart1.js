import React, { Component } from 'react';
import { Doughnut } from 'react-chartjs-2';
import {connect} from 'react-redux'


class Chart1 extends Component {
  render() {
    let { purchases, budgetLimit } = this.props.budget;
    purchases = purchases || [];
    const moneySpent = purchases.reduce((total, purchase) => {
      return total + purchase.price
    }, 0)
    const remainingBudget = (budgetLimit - moneySpent) >= 0 ? (budgetLimit - moneySpent) : 0;
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <h6>Limit: ${budgetLimit}</h6>
        <Doughnut data={{
          labels: [
            'Spent',
            'Remainder'
          ],
          datasets: [{
            data: [moneySpent, remainingBudget],
            backgroundColor: [
              '#C82233',
              '#72C934',
            ],
            hoverBackgroundColor: [
              '#C82233',
              '#72C934',
            ]
          }]
        }} />
      </div>
    )
  }
}

function mapStateToProps (reduxState) {
  return {
    budget: reduxState.budget,
  }
}

export default connect(mapStateToProps) (Chart1);