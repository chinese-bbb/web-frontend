export type TimeString = string;
export type UrlString = string;

export interface SearchItem {
  CreditCode: string | '';
  KeyNo: string;
  Name: string;
  No: string;
  OperName: string | '';
  StartDate: TimeString | '';
  Status: string | '';
}

export interface MerchantDetail {
  Address: string;
  BelongOrg: string;
  CheckDate: TimeString;
  CreditCode: string;
  EconKind: string;
  EndDate: TimeString | '';
  ImageUrl: UrlString;
  IsOnStock: string;
  KeyNo: string;
  Name: string;
  No: string;
  OperName: string;
  OrgNo: string;
  OriginalName: string[];
  Province: string;
  RegistCapi: string;
  Scope: string;
  StartDate: TimeString;
  Status: string;
  StockNumber: null | string;
  StockType: null | string;
  TeamEnd: TimeString;
  TermStart: TimeString;
  UpdatedDate: TimeString;
  merchant_id?: string;
}

export interface RawComplaint {
  merchantId: string;
  /**
   * 投诉类型
   */
  complaintType: string;
  /**
   * 其他投诉类型
   */
  otherComplaintType: string;
  /**
   * 是否沟通协商过
   */
  negotiated: boolean;
  /**
   * 沟通时间
   */
  negotiateDate: TimeString;
  /**
   * 是否允许公开
   */
  allowPublicView: boolean;
  /**
   * 是否允许媒体报道
   */
  allowPress: boolean;
  /**
   * 主题投诉内容
   */
  mainContent: string;
  /**
   * 期望方案
   */
  expectedSolution: string;
  /**
   * 消费总金额
   */
  totalConsumption: string;
  /**
   * 涉及产品
   */
  involvedProducts: string;
  /**
   * 交易信息
   */
  tradeInfo: string;
  /**
   * 交易时间
   */
  purchaseDate: TimeString;
  uploadedInvoices: string[];
  uploadedEvidences: string[];
}

export interface ServerComplaintModel {
  allow_contact_by_merchant: boolean;
  allow_press: boolean;
  allow_public: boolean;
  complain_timestamp: string;
  complain_type: ComplaintType;
  complaint_body: string;
  complaint_id: string;
  complaint_state: ComplaintState;
  expected_solution_body: string;
  id_files: string[];
  if_negotiated_by_merchant: boolean;
  invoice_files: string[];
  item_model: string;
  item_price: string;
  merchant_id: number;
  negotiate_timestamp: string;
  purchase_timestamp: string;
  relatedProducts: string;
  trade_info: string;
  user: UserModel;
}

export interface SignUpMeta {
  phoneNum: string;
  password: string;
  sex: string;
  firstName: string;
  lastName: string;
}

export interface UserModel {
  if_verified: boolean;
  sex: string;
  registered_date: string;
  username: string;
  first_name: string;
  last_name: string;
}

export type ComplaintType =
  'product_issue'
  | 'fake_add'
  | 'customer_service'
  | 'exchange_return'
  | 'warranty'
  | 'contract'
  | 'shipping'
  | 'infraction'
  | 'other';

export type ComplaintState = 'initialized' | 'in_progress' | 'resolved';

export interface CommentModel {
  complaint_id: string;
  text: string;
  timestamp: string;
  user: UserModel;
}
