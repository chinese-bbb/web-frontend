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
}
