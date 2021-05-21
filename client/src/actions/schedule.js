import { LOAD_SCHEDULE, UPDATE_SCHEDULE } from '../actions/types';

//update the schedule
export const updateSchedule = (formData) => async (dispatch) => {
	try {
		dispatch({
			type: UPDATE_SCHEDULE,
			payload: formData,
		});
	} catch (err) {
		dispatch({
			type: PROJECT_ERROR,
			payload: err,
		});
	}
};
