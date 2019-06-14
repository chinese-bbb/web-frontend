import axios from 'axios';
import { RawComplaint } from '@/models';

export class ComplaintService {
  public createComplaint(rawComplaint: RawComplaint) {
    return axios.post('/complaint', {
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
      id_files: rawComplaint.uploadedEvidences,
    });
  }

  public getComplaintByMerchant(id: string) {
    return axios.get('/complaintByMerchant', { params: { merchant_id: id } });
  }
}

export default new ComplaintService();
