<template>
  <div class="file-complaint-view container">
    <form-wizard
      :v-loading="submitting"
      @on-complete="onComplete"
      color="#1a535c"
      hide-buttons
      ref="wizard"
      shape="tab"
    >
      <tab-content title="投诉说明">
        <div class="row">
          <div class="col-8">
            <el-card shadow="never">
              <h4>我们处理什么投诉？</h4>

              <p>消费者在购买产品或者服务时与商家产生得纠纷。</p>

              <h4>我们不处理：</h4>

              <p>
                员工和雇主之间得纠纷; 种族歧视主张; 已经诉讼/仲裁的事项; 挑战国家法律有效性的问题; 对政府机构的投诉;
                其他与消费服务无关的事项。
              </p>

              <h4>我们如何处理您的投诉？</h4>

              <p>
                您提交的所有内容将在两个工作日内转发给企业。该企业将被要求在14天内回复，如果未收到回复，将发出第二次请求。你可以在程序中查看投诉进度。投诉通常在30个工作日内结束。
              </p>

              <h4>投诉必须符合如下标准：</h4>

              <ul>
                <li>选择正确的企业</li>
                <li>投诉来自具消费者本人</li>
                <li>投诉涉及具体消费行为</li>
                <li>投诉的消费问题必须在过去12个月内</li>
                <li>投诉必须明确涉及和描述企业在提供的服务或者产品中的缺陷</li>
                <li>在提交投诉时，投诉涉及的内容不在法院诉讼程序中</li>
                <li>投诉中没有滥用语言</li>
              </ul>
              <footer class="text-right">
                <el-button @click.native="$refs.wizard.nextTab()" type="primary">同意，下一步</el-button>
              </footer>
            </el-card>
          </div>

          <div class="col-4">
            <el-card class="hint-card" shadow="hover">
              请仔细阅读左列信息，如同意请点击下一步
            </el-card>
          </div>
        </div>
      </tab-content>

      <tab-content title="投诉类型">
        <div class="row">
          <div class="col-8">
            <el-card shadow="never">
              <el-form :model="complaintTypeForm" ref="complaintTypeForm">
                <ol class="complaint-type-questions">
                  <li>
                    <h5>投诉类型</h5>

                    <el-radio-group v-model="complaintTypeForm.complaintType">
                      <el-radio :label="1">产品或者服务质量问题</el-radio>
                      <el-radio :label="2">虚假广告等相关问题</el-radio>
                      <el-radio :label="3">客服问题</el-radio>
                      <el-radio :label="4">退换货问题</el-radio>
                      <el-radio :label="5">保修问题</el-radio>
                      <el-radio :label="6">合同或者账单问题</el-radio>
                      <el-radio :label="7">物流问题</el-radio>
                      <el-radio :label="8">商业违规行为等问题</el-radio>
                      <el-radio :label="9"
                      >其他
                        <el-input
                          :disabled="complaintTypeForm.complaintType !== 9"
                          name="other"
                          v-model="complaintTypeForm.otherComplaintType"
                        ></el-input>
                      </el-radio>
                    </el-radio-group>
                  </li>

                  <li>
                    <h5>你是否已经同商家沟通过？</h5>

                    <el-radio-group v-model="complaintTypeForm.negotiated">
                      <el-radio :label="true">是</el-radio>
                      <el-radio :label="false">否</el-radio>
                    </el-radio-group>
                  </li>

                  <li>
                    <h5>你最近一次与商家沟通的日期？</h5>

                    <div>
                      <el-date-picker
                        :disabled="!complaintTypeForm.negotiated"
                        :pickerOptions="pickerOptions"
                        placeholder="选择日期时间"
                        type="datetime"
                        v-model="complaintTypeForm.negotiateDate"
                      >
                      </el-date-picker>
                    </div>
                  </li>

                  <li>
                    <h5>你是否同意公开投诉内容？</h5>

                    <el-radio-group v-model="complaintTypeForm.allowPublicView">
                      <el-radio :label="true">是</el-radio>
                      <el-radio :label="false">否</el-radio>
                    </el-radio-group>
                  </li>

                  <li>
                    <h5>媒体可以联系我并报道我的投诉内容。</h5>

                    <el-radio-group v-model="complaintTypeForm.allowPress">
                      <el-radio :label="true">是</el-radio>
                      <el-radio :label="false">否</el-radio>
                    </el-radio-group>
                  </li>
                </ol>

                <footer class="text-right">
                  <el-button @click.native="$refs.wizard.prevTab()">上一步</el-button>

                  <el-button @click.native="validateFormAndJump($refs.complaintTypeForm, $refs.wizard)" type="primary">
                    下一步
                  </el-button>
                </footer>
              </el-form>
            </el-card>
          </div>

          <div class="col-4">
            <el-card class="hint-card" shadow="hover">
              请选择投诉原因以及其他相关信息
            </el-card>
          </div>
        </div>
      </tab-content>

      <tab-content title="投诉内容">
        <div class="row">
          <div class="col-8">
            <el-card shadow="never">
              <el-form
                :model="complaintDetailForm"
                :rules="rules"
                label-position="left"
                label-width="120px"
                ref="complaintDetailForm"
              >
                <el-form-item label="消费总金额" prop="totalConsumption">
                  <el-input v-model="complaintDetailForm.totalConsumption"></el-input>
                </el-form-item>

                <el-form-item label="涉及产品" prop="relatedProducts">
                  <el-input v-model="complaintDetailForm.relatedProducts"></el-input>
                </el-form-item>

                <el-form-item label="交易信息" prop="tradeInfo">
                  <el-input v-model="complaintDetailForm.tradeInfo"></el-input>
                </el-form-item>

                <el-form-item label="交易日期" prop="tradeDate">
                  <el-date-picker
                    :pickerOptions="pickerOptions"
                    placeholder="选择日期时间"
                    type="datetime"
                    v-model="complaintDetailForm.tradeDate"
                  >
                  </el-date-picker>
                </el-form-item>

                <el-form-item class="without-label" prop="content">
                  <h5>1. 投诉内容</h5>

                  <el-input
                    :autosize="{ minRows: 4 }"
                    maxlength="2000"
                    minlength="300"
                    placeholder="300~2000字，同时尽可能具体的描述所遇到的问题，以及问题发现的时间，不要使用过激语言"
                    show-word-limit
                    type="textarea"
                    v-model="complaintDetailForm.content"
                  >
                  </el-input>
                </el-form-item>

                <el-form-item class="without-label" prop="expectedSolution">
                  <h5>2. 期望的解决方案</h5>

                  <el-input
                    :autosize="{ minRows: 4 }"
                    maxlength="1000"
                    minlength="150"
                    placeholder="下限150字，上限1000字"
                    show-word-limit
                    type="textarea"
                    v-model="complaintDetailForm.expectedSolution"
                  >
                  </el-input>
                </el-form-item>

                <footer class="text-right">
                  <el-button @click.native="$refs.wizard.prevTab()">上一步</el-button>

                  <el-button
                    @click.native="validateFormAndJump($refs.complaintDetailForm, $refs.wizard)"
                    type="primary"
                  >
                    下一步
                  </el-button>
                </footer>
              </el-form>
            </el-card>
          </div>

          <div class="col-4">
            <el-card class="hint-card" shadow="hover"></el-card>
          </div>
        </div>
      </tab-content>

      <tab-content title="图片证据">
        <div class="row">
          <div class="col-8">
            <el-card shadow="never">
              <el-form :model="uploadForm" :rules="rules" ref="uploadForm">
                <el-form-item prop="uploadedInvoices">
                  <h5>1. 购买发票信息 <span class="header-hint">（最多一张图片）</span></h5>

                  <el-upload
                    :action="invoiceUploadUrl"
                    :before-upload="beforeUpload"
                    :file-list="uploadForm.invoiceImages"
                    :limit="1"
                    :on-exceed="handleExceed"
                    :on-preview="handlePictureCardPreview"
                    :on-remove="removeInvoice"
                    :on-success="handleInvoiceUploadSuccess"
                    :show-file-list="true"
                    accept=".jpg,.jpeg,.png"
                    class="evidence-upload"
                    list-type="picture-card"
                    name="pic_file"
                    with-credentials
                  >
                    <i class="el-icon-plus"></i>
                    <span>点击上传图片</span>

                    <div class="el-upload__tip" slot="tip">只能上传 jpg/png 文件，且不超过 {{ fileSizeLimit }} MB</div>
                  </el-upload>
                </el-form-item>

                <el-form-item prop="uploadedOtherEvidences">
                  <h5>2. 其他图片证据 <span class="header-hint">（最多9张图片）</span></h5>

                  <el-upload
                    :action="invoiceUploadUrl"
                    :before-upload="beforeUpload"
                    :file-list="uploadForm.otherEvidenceImages"
                    :limit="9"
                    :on-exceed="handleExceed"
                    :on-preview="handlePictureCardPreview"
                    :on-remove="removeOtherEvidence"
                    :on-success="handleOtherEvidenceUploadSuccess"
                    :show-file-list="true"
                    accept=".jpg,.jpeg,.png"
                    class="evidence-upload"
                    list-type="picture-card"
                    name="pic_file"
                    with-credentials
                  >
                    <i class="el-icon-plus"></i>
                    <span>点击上传图片</span>

                    <div class="el-upload__tip" slot="tip">只能上传 jpg/png 文件，且不超过 {{ fileSizeLimit }} MB</div>
                  </el-upload>
                </el-form-item>

                <el-dialog :visible.sync="dialogVisible">
                  <img :src="dialogImageUrl" alt="" width="100%"/>
                </el-dialog>

                <footer class="text-right">
                  <el-button @click.native="$refs.wizard.prevTab()">上一步</el-button>

                  <el-button @click.native="validateFormAndJump($refs.uploadForm, $refs.wizard)" type="primary">
                    下一步
                  </el-button>
                </footer>
              </el-form>
            </el-card>
          </div>

          <div class="col-4">
            <el-card class="hint-card" shadow="hover">
              请提交发票信息及图片证据
            </el-card>
          </div>
        </div>
      </tab-content>

      <tab-content title="完成投诉">
        <div class="row">
          <div class="col-8">
            <el-card shadow="never">
              <h4>投诉清单</h4>

              <el-divider></el-divider>

              <p class="text-right">请检查以上投诉信息，确认无误请点击完成</p>

              <footer class="text-right">
                <el-button @click.native="$refs.wizard.prevTab()">上一步</el-button>

                <el-button @click.native="$refs.wizard.nextTab()" class="btn-confirm-finish" size="large" type="primary"
                >完成
                </el-button>
              </footer>
            </el-card>
          </div>

          <div class="col-4">
            <el-card class="hint-card" shadow="hover"></el-card>
          </div>
        </div>
      </tab-content>
    </form-wizard>
  </div>
</template>

<script lang="ts">
import axios from 'axios';
import { Component, Prop, Vue } from 'vue-property-decorator';
import FormWizard from '@/libs/vue-form-wizard/components/FormWizard.vue';
import TabContent from '@/libs/vue-form-wizard/components/TabContent.vue';
import { ElForm } from 'element-ui/types/form';

import { complaintService } from '../../services';

@Component({
  components: {
    FormWizard,
    TabContent,
  },
})
export default class FileComplaint extends Vue {
  @Prop(String) merchantId: string;

  dialogImageUrl = '';
  dialogVisible = false;
  submitting = false;
  // unit: MB
  fileSizeLimit = 3;
  invoiceUploadUrl = axios.defaults.baseURL + '/complaint/upload';

  complaintTypeForm: {
    negotiateDate: string | Date;
    otherComplaintType: string;
    complaintType: number;
    negotiated: boolean;
    allowPublicView: boolean;
    allowPress: boolean;
  } = {
    negotiateDate: '',
    otherComplaintType: '',
    complaintType: 1,
    negotiated: false,
    allowPublicView: false,
    allowPress: false,
  };

  complaintDetailForm: {
    content: string;
    expectedSolution: string;
    tradeDate: string | Date;
    tradeInfo: string;
    totalConsumption: string;
    relatedProducts: string;
  } = {
    content: '',
    expectedSolution: '',
    tradeDate: '',
    tradeInfo: '',
    totalConsumption: '',
    relatedProducts: '',
  };

  uploadForm = {
    invoiceImages: [] as any[],
    otherEvidenceImages: [] as any[],
    uploadedInvoices: [] as string[],
    uploadedOtherEvidences: [] as string[],
  };

  rules = {
    content: [
      { required: false, message: '请输入投诉内容', trigger: 'blur' },
      { min: 300, message: '内容长度不满足要求', trigger: 'blur' },
    ],
    // tradeDate: [{ required: true, message: '请输入有效时间', trigger: 'blur' }],
    expectedSolution: [{ required: false, message: '请输入期望解决方案', trigger: 'blur' }, { min: 150 }],
    uploadedInvoices: [{ required: false, type: 'array', message: '至少上传一张发票图片', trigger: 'blur' }],
  };

  pickerOptions = {
    disabledDate(time: Date) {
      return time.getTime() > Date.now();
    },
    format: 'yyyy-MM-dd HH:mm',
    valueFormat: 'yyyy-MM-dd HH:mm',
  };

  onComplete() {
    (this.$refs.wizard as any).setLoading(true);
    this.submitting = true;

    complaintService
      .createComplaint({
        merchantId: this.merchantId,
        complaintType: this.complaintTypeForm.complaintType.toString(),
        otherComplaintType: this.complaintTypeForm.otherComplaintType,
        negotiated: this.complaintTypeForm.negotiated,
        negotiateDate:
          typeof this.complaintTypeForm.negotiateDate === 'string'
            ? this.complaintTypeForm.negotiateDate
            : this.complaintTypeForm.negotiateDate.toISOString(),
        allowPublicView: this.complaintTypeForm.allowPublicView,
        allowPress: this.complaintTypeForm.allowPress,
        mainContent: this.complaintDetailForm.content,
        expectedSolution: this.complaintDetailForm.expectedSolution,
        totalConsumption: this.complaintDetailForm.totalConsumption,
        involvedProducts: this.complaintDetailForm.relatedProducts,
        tradeInfo: this.complaintDetailForm.tradeInfo,
        purchaseDate:
          typeof this.complaintDetailForm.tradeDate === 'string'
            ? this.complaintDetailForm.tradeDate
            : this.complaintDetailForm.tradeDate.toISOString(),
      })
      .then(
        resp => {
          this.$msgbox
            .alert('成功提交投诉，请等候商家处理', {
              showConfirmButton: true,
              showClose: false,
              center: true,
            })
            .then(() => {
              this.$router.push({ name: 'profile' });
            });
        },
        error => {
          // do something
        },
      )
      .finally(() => (this.submitting = false));
  }

  validateFormAndJump(form: any, wizard: any) {
    form.validate((valid: boolean) => {
      if (valid) {
        wizard.nextTab();
      }
    });
  }

  handleExceed() {
    this.$message({
      message: `上传文件数量到达上限！`,
      type: 'warning',
    });
  }

  beforeUpload(file: File) {
    const isIMAGE = file.type === 'image/jpeg' || 'image/png';

    if (!isIMAGE) {
      this.$message({
        message: `上传图片格式不支持!`,
        type: 'warning',
      });

      return false;
    }

    const isExceededLimit = file.size / 1024 / 1024 > this.fileSizeLimit;
    if (isExceededLimit) {
      this.$message({
        message: `上传文件大小不能超过 ${this.fileSizeLimit} MB!`,
        type: 'warning',
      });

      return false;
    }
  }

  handlePictureCardPreview(file: any) {
    this.dialogImageUrl = file.url;
    this.dialogVisible = true;
  }

  handleInvoiceUploadSuccess(response: any, file: any, filelist: any[]) {
    this.uploadForm.invoiceImages = filelist;
    this.uploadForm.uploadedInvoices.push('a');
    (this.$refs.uploadForm as ElForm).validateField('uploadedInvoices', () => void 0);
  }

  handleOtherEvidenceUploadSuccess(response: any, file: any, filelist: any[]) {
    this.uploadForm.otherEvidenceImages = filelist;
    this.uploadForm.uploadedOtherEvidences.push('a');
    (this.$refs.uploadForm as ElForm).validateField('uploadedOtherEvidences', () => void 0);
  }

  removeOtherEvidence(file: any, filelist: any[]) {
    const index = this.uploadForm.otherEvidenceImages.findIndex(img => img === file);
    this.uploadForm.uploadedOtherEvidences.splice(index, 1);
    this.uploadForm.otherEvidenceImages = filelist;
  }

  removeInvoice(file: any, filelist: any[]) {
    const index = this.uploadForm.invoiceImages.findIndex(img => img === file);
    this.uploadForm.uploadedInvoices.splice(index, 1);
    this.uploadForm.invoiceImages = filelist;
  }
}
</script>

<style lang="scss" scoped>
  @import '../../styles/helper';

  .el-radio {
    display: block;
  }

  .hint-card {
    min-height: 300px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.25rem;
  }

  .header-hint {
    font-size: 14px;
    color: $--color-danger;
  }

  .vue-form-wizard /deep/ {
    .wizard-tab-content {
      margin-top: 2em;
    }
  }

  .without-label /deep/ .el-form-item__content {
    margin-left: 0 !important;
  }

  .complaint-type-questions {
    li:not(:last-child) {
      margin-bottom: 1rem;
    }
  }

  .evidence-upload {
    line-height: 1;
  }

  .evidence-upload /deep/ {
    .el-upload--picture-card {
      display: inline-flex;
      flex-direction: column;
      justify-content: center;
      line-height: 2;
    }

    .el-upload-list__item-thumbnail {
      object-fit: contain;
    }
  }

  .btn-confirm-finish {
    width: 10rem;
  }
</style>
