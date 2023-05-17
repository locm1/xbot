import axios from "axios";

export const getDefaultSegments = (setQuestionnaires) => {
	axios.get('/api/v1/management/default-segments')
		.then((response) => {
			const segments = response.data.segments;
			const newSegments = [];
			segments.forEach(v => {
				if (v.type == 1) {
					newSegments.push({
						id: v.id, displayOrder: v.display_order, type: v.type, questionTitle: v.title, isDefault: 1,
						questionnaireItems: v.default_segment_items.map((item, k) => ({ id: k + 1, name: v.name, value: item.value, label: item.label }))
					});
				} else if (v.type == 4) {
					newSegments.push({
						id: v.id, displayOrder: v.display_order, type: v.type, questionTitle: v.title, isDefault: 1,
						questionnaireItems: { value: [], name: v.name, }
					});
				} else {
					newSegments.push({
						id: v.id, displayOrder: v.display_order, type: v.type, questionTitle: v.title, isDefault: 1,
						questionnaireItems: [{ name: 'start_' + v.name, value: '' }, { name: 'end_' + v.name, value: '' }]
					});
				}
			});
			setQuestionnaires(newSegments);
		})
		.catch(error => {
			console.error(error);
		})
}

export const getAllReports = () => {
	return axios.get('/api/v1/management/reports');
}

export const getReport = (id) => { 
	return axios.get(`/api/v1/management/reports/${id}`)
}

export const storeReport = (data) => {
	return axios.post('/api/v1/management/reports', data)
}

export const updateReport = (id, data) => {
	return axios.put(`/api/v1/management/reports/${id}`, data)
}