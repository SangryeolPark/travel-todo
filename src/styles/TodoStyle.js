import styled from '@emotion/styled';

export const TodoDiv = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 80%;
  height: 80%;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0px 2px 5px 0px rgba(0, 0, 0, 0.5);
  padding: 70px 50px;
  h2 {
    font-size: 24px;
    margin-bottom: 10px;
    color: #1e88e5;
  }
  .travelScheduleWrap {
    width: 100%;
    display: flex;
    justify-content: space-between;
    margin-bottom: 30px;
    .inputTravel {
      display: flex;
    }
    .addTravelBtn {
    }
  }
  .detailPlanWrap {
    display: flex;
    .travelPlan {
      display: flex;
      justify-content: center;
      width: 100%;
      height: 100%;
      padding-right: 25px;
      border-right: 1px solid #ccc;
      position: relative;
      .addPlanBtn {
        position: absolute;
        right: 25px;
        bottom: 0;
      }
    }
    .travelReview {
      width: 100%;
      text-align: start;
      padding-left: 25px;
    }
  }
`;
