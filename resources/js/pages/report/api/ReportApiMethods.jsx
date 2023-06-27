import axios from "axios";
import Swal from "sweetalert2";

export const getDefaultSegments = (setQuestionnaires) => {
	axios.get('/api/v1/management/default-segments')
		.then((response) => {
			const segments = response.data.segments;
			console.log(response.data.segments);
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

export const deleteReport = async(id) => {
	return await axios.delete(`/api/v1/management/reports/${id}`).then(response => {
		console.log(response);
		Swal.fire('削除成功', '選択したレポートは削除されました', 'success')
	}).catch(error => {
		Swal.fire('削除失敗', '選択したレポートの削除に失敗しました', 'error')
	})
}

export const getQuestionnaires = async (setQuestionnaires) => {
  return await axios.get('/api/v1/questionnaires')
  .then((response) => {
    const questionnaires = response.data.questionnaires;
    console.log(questionnaires);
		const newQuestionnaires = [];
		questionnaires.forEach(v => {
			if (v.type == 3 ||v.type ==  4 ||v.type ==  5) {
				newQuestionnaires.push({
					id: v.id, displayOrder: v.display_order, type: 1, questionTitle: v.title, isDefault: 0,
					questionnaireItems: v.questionnaire_items.map((item, k) => ({ id: item.id , name: 'questionnaireId-' + v.id, value: item.name, label: item.name }))
				});
			} else if (v.type == 1 ||v.type ==  2) {
				console.log('sdasa')
				newQuestionnaires.push({
					id: v.id, displayOrder: v.display_order, type: 4, questionTitle: v.title, isDefault: 0,
					questionnaireItems: { value: [], name: v.id, }
				});
			} else {
				newQuestionnaires.push({
					id: v.id, displayOrder: v.display_order, type: 5, questionTitle: v.title, isDefault: 0,
					questionnaireItems: [{ name: 'start_' + v.name, value: '' }, { name: 'end_' + v.name, value: '' }]
				});
			}
		});
    setQuestionnaires(newQuestionnaires)
		return newQuestionnaires;
  })
  .catch(error => {
      console.error(error);
  });
};