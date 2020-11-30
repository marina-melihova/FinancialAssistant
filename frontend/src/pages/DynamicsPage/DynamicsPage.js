import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import device, { size } from '../../common/deviceSizes';
//import { colors } from "../../stylesheet/vars";
import GiftCompleting from '../../components/GiftCompleting/GiftCompleting';
import { MonthlyExecutionPlan } from '../MonthlyExecutionPlan/MonthlyExecutionPlan.js';
import ChartWrapper from '../ChartExpenseIncome/ChartWrapper.js';
import ProgressInfo from '../../components/ProgressInfo/ProgressInfo';
import ApartmentVisualization from '../../components/ApartmentVisualization/ApartmentVisualization';
import { useDispatch, useSelector } from 'react-redux';
import statsOperatioins from '../../redux/operations/statsOperatioins';
import Modal from '../../components/Modal/Modal';
import {
  modalCongratulation,
  modalError,
} from '../../redux/selectors/modalSelector';
import Congratulation from '../../components/Congratulation/Congratulation';
import Error from '../../components/Error/Error';
import modalAction from '../../redux/actions/modalAction';

const DynamicsPage = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(statsOperatioins.getStatsFlat());
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const congratulationModal = useSelector(state => modalCongratulation(state));

  const errorModal = useSelector(state => modalError(state));

  const [errorState, setError] = useState(errorModal ? true : false);
  const closeModalError = () => {
    setError(false);
    dispatch(modalAction.closeModalError());
  };

  useEffect(() => {
    if (errorModal) {
      setError(true);
    } else {
      setError(false);
    }
  }, [errorModal]);

  const [congratulationState, setCongratulation] = useState(
    congratulationModal ? true : false,
  );
  const closeCongratulationModal = () => {
    setCongratulation(false);
    dispatch(modalAction.closeModalCongratulation());
  };

  useEffect(() => {
    if (congratulationModal) {
      setCongratulation(true);
    } else {
      setCongratulation(false);
    }
  }, [congratulationModal]);

  return (
    <>
      {congratulationState && (
        <Modal closeModal={closeCongratulationModal}>
          <Congratulation closeModal={closeCongratulationModal} />
        </Modal>
      )}

      {errorState && (
        <Modal closeModal={closeModalError}>
          <Error closeModal={closeModalError} />
        </Modal>
      )}

      <DynamicsPageWrapper>
        <GraphAnnualWrapper>
          <GrafWrapper>
            <ChartWrapper />
          </GrafWrapper>
          <AnnualWrapper>
            <MonthlyExecutionPlan />
          </AnnualWrapper>
        </GraphAnnualWrapper>
        <ProgressPicturePresentWrapper>
          <ProgressPictureWrapper>
            <ProgressInfoWrapper>
              <ProgressInfo />
            </ProgressInfoWrapper>
            <PictureWrapper>
              <ApartmentVisualization />
            </PictureWrapper>
          </ProgressPictureWrapper>
          <PresentWrapper>
            <GiftCompleting />
          </PresentWrapper>
        </ProgressPicturePresentWrapper>
      </DynamicsPageWrapper>
    </>
  );
};

export default DynamicsPage;

const DynamicsPageWrapper = styled.div`
  width: 280px;
  padding: 38px 0px 56px;
  margin: 0 auto;

  @media ${device.tablet} {
    width: 690px;
    padding: 74px;
  }
  @media ${device.desktop} {
    width: 1170px;
    display: flex;
    justify-content: space-between;
    padding: 60px 0px 64px;
  }
`;

const GraphAnnualWrapper = styled.div`
  margin: 0 auto;

  @media ${device.desktop} {
    margin: 0;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
`;

const ProgressPicturePresentWrapper = styled.div``;

const GrafWrapper = styled.div`
  margin-bottom: 30px;

  @media ${device.tablet} {
    margin-bottom: 50px;
  }
`;

const AnnualWrapper = styled.div`
  margin-bottom: 30px;

  @media ${device.tablet} {
    margin-bottom: 75px;
  }
  @media ${device.desktop} {
    margin-bottom: 0px;
  }
`;

const ProgressPictureWrapper = styled.div`
  @media ${device.tablet} {
    width: 510px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    margin-bottom: 72px;
    align-items: flex-end;
  }
  @media ${device.desktop} {
    display: flex;
    justify-content: space-between;
    margin-bottom: 60px;
    align-items: flex-end;
  }
`;

const ProgressInfoWrapper = styled.div`
  margin-bottom: 24px;
  margin-left: auto;
  margin-right: auto;
  width: 280px;

  @media (min-width: ${size.tablet}) {
    margin: 0px;
    width: 240px;
  }
`;

const PictureWrapper = styled.div`
  margin-bottom: 42px;
  border: 2px solid #e5e9f2;
  border-radius: 8px;

  @media ${device.tablet} {
    margin-bottom: 0px;
    width: 240px;
  }
  @media ${device.desktop} {
    margin-bottom: 0px;
    width: 48%;
  }
`;

const PresentWrapper = styled.div``;
