import axios from 'axios';
import { CommentModel, RawComplaint, ServerComplaintModel } from '@/models';

export class ComplaintService {
  public createComplaint(rawComplaint: RawComplaint) {
    return axios.post('/complaints', {
      merchant_id: rawComplaint.merchantId,
      complaint_body: rawComplaint.mainContent,
      expected_solution_body: rawComplaint.expectedSolution,
      complain_type: rawComplaint.complaintType,
      if_negotiated_by_merchant: rawComplaint.negotiated,
      negotiate_timestamp: rawComplaint.negotiateDate,
      allow_public: rawComplaint.allowPublicView,
      allow_press: rawComplaint.allowPress,
      item_price: rawComplaint.totalConsumption,
      trade_info: rawComplaint.tradeInfo,
      relatedProducts: rawComplaint.involvedProducts,
      purchase_timestamp: rawComplaint.purchaseDate,
      invoice_files: rawComplaint.uploadedInvoices,
      evidence_files: rawComplaint.uploadedEvidences,
    });
  }

  public getComplaint(id: number | string) {
    return axios.get<ServerComplaintModel>(`/complaints/${id}`);
  }

  public getLatestComplaints() {
    return axios.get<ServerComplaintModel[]>(`/complaints/last`, { params: { N: 5 } });
  }

  public getComplaintByMerchant(id: string) {
    return axios.get('/complaints/byMerchant', { params: { merchant_id: id } });
  }

  public getCommentsByComplaint(id: string) {
    return axios.get<CommentModel[]>(`/comments/byComplaint/${id}`);
  }

  public addComment(id: string, text: string) {
    return axios.post(`/comments`, {
      text,
      complaint_id: id,
    });
  }

  public getUserComplaints(phoneNumber: string) {
    return axios.get('/complaints/byUser', { params: { phone_num: phoneNumber } });
  }
}

export default new ComplaintService();
