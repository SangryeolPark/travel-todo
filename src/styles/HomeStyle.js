import styled from '@emotion/styled';

export const HomeDiv = styled.div`
  width: 100%;
  height: 100%;
  padding: 120px 100px 150px;
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: start;
  position: relative;
  /* position: absolute;
  top: 50%;
  left: 0;
  transform: translateY(-50%); */
  .title {
    position: absolute;
    top: 15%;
    width: 48vw;
  }
  .bottom {
    padding-top: 33%;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .ant-btn {
      width: 17vw;
      height: 70px;
      font-size: 24px;
      line-height: 30px;
      border-radius: 10px;
      background: rgb(255, 67, 139);
      box-shadow: 0px 2px 5px 0px rgba(0, 0, 0, 0.2);
      :hover {
        background: rgb(204, 0, 78);
      }
    }
    .logoImg {
      width: 21vw;
    }
  }
`;
