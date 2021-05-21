import { UPDATE_SCHEDULE, SCHEDULE_ERROR } from '../actions/types';

const initialState = [
	{ timeSlot: '8am-9am', name: '', phoneNumber: '' },
	{ timeSlot: '9am-10am', name: '', phoneNumber: '' },
	{ timeSlot: '10am-11am', name: '', phoneNumber: '' },
	{ timeSlot: '11am-12am', name: '', phoneNumber: '' },
	{ timeSlot: '12am-1pm', name: '', phoneNumber: '' },
	{ timeSlot: '1pm-2pm', name: '', phoneNumber: '' },
	{ timeSlot: '2pm-3pm', name: '', phoneNumber: '' },
	{ timeSlot: '3pm-4pm', name: '', phoneNumber: '' },
	{ timeSlot: '4pm-5pm', name: '', phoneNumber: '' },
];

export default function (state = initialState, action) {
	const { type, payload } = action;

	switch (type) {
		case UPDATE_SCHEDULE:
			return {
				...state,
				project: payload,
				loading: false,
			};
		case SCHEDULE_ERROR:
			return {
				...state,
				errror: payload,
			};
		default:
			return state;
	}
}
