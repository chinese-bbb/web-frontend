<template>
  <div class="file-complaint-view container">
    <form-wizard @on-complete="onComplete"
                 color="#1a535c"
                 shape="tab"
                 hide-buttons
                 ref="wizard">
      <tab-content title="投诉说明">
        <div class="row">
          <div class="col-8">
            <el-card shadow="never">
              <h4>不能投诉的范围以及一系列声明</h4>

              <p>xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx</p>
              <p>xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx</p>
              <p>xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx</p>
              <p>xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx</p>
              <p>xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx</p>
              <p>xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx</p>

              <footer class="text-right">
                <el-button type="primary" @click.native="$refs.wizard.nextTab()">同意，下一步</el-button>
              </footer>
            </el-card>
          </div>

          <div class="col-4">
            <el-card class="hint-card" shadow="hover"></el-card>
          </div>
        </div>
      </tab-content>

      <tab-content title="投诉类型">
        <div class="row">
          <div class="col-8">
            <el-card shadow="never">
              <el-radio v-model="radio" label="1">产品服务</el-radio>
              <el-radio v-model="radio" label="2">备选项</el-radio>
              <el-radio v-model="radio" label="3">备选项</el-radio>
              <el-radio v-model="radio" label="4">备选项</el-radio>
              <el-radio v-model="radio" label="5">备选项</el-radio>

              <footer class="text-right">
                <el-button @click.native="$refs.wizard.prevTab()">上一步</el-button>

                <el-button type="primary" @click.native="$refs.wizard.nextTab()">下一步</el-button>
              </footer>
            </el-card>
          </div>

          <div class="col-4">
            <el-card class="hint-card" shadow="hover"></el-card>
          </div>
        </div>
      </tab-content>

      <tab-content title="投诉内容">
        <div class="row">
          <div class="col-8">
            <el-card shadow="never">
              <section>
                <h4>1. 事情经过</h4>

                <el-input
                  type="textarea"
                  :autosize="{ minRows: 4}"
                  placeholder="请输入内容">
                </el-input>
              </section>

              <section>
                <h4>1. 事情经过</h4>

                <el-input
                  type="textarea"
                  :autosize="{ minRows: 4}"
                  placeholder="请输入内容">
                </el-input>
              </section>

              <section>
                <h4>1. 事情经过</h4>

                <el-input
                  type="textarea"
                  :autosize="{ minRows: 4}"
                  placeholder="请输入内容">
                </el-input>
              </section>

              <section>
                <h4>1. 事情经过</h4>

                <el-input
                  type="textarea"
                  :autosize="{ minRows: 4}"
                  placeholder="请输入内容">
                </el-input>
              </section>

              <footer class="text-right">
                <el-button @click.native="$refs.wizard.prevTab()">上一步</el-button>

                <el-button type="primary" @click.native="$refs.wizard.nextTab()">下一步</el-button>
              </footer>
            </el-card>
          </div>

          <div class="col-4">
            <el-card class="hint-card" shadow="hover"></el-card>
          </div>
        </div>
      </tab-content>

      <tab-content title="权利声明">
        <div class="row">
          <div class="col-8">
            <el-card shadow="never">
              form

              <footer class="text-right">
                <el-button @click.native="$refs.wizard.prevTab()">上一步</el-button>

                <el-button type="primary" @click.native="$refs.wizard.nextTab()">下一步</el-button>
              </footer>
            </el-card>
          </div>

          <div class="col-4">
            <el-card class="hint-card" shadow="hover"></el-card>
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

                <el-button type="primary" @click.native="$refs.wizard.nextTab()">完成</el-button>
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
import { Component, Vue } from 'vue-property-decorator';
import FormWizard from '@/libs/vue-form-wizard/components/FormWizard.vue';
import TabContent from '@/libs/vue-form-wizard/components/TabContent.vue';

@Component({
  components: {
    FormWizard,
    TabContent,
  },
})
export default class MerchantInfo extends Vue {
  radio: number = 0;

  onComplete() {
    alert('Yay. Done!');
  }
}
</script>

<style lang="scss" scoped>
  .el-radio {
    display: block;
  }

  .hint-card {
    min-height: 200px;
  }

  .vue-form-wizard /deep/{
    .wizard-tab-content {
      margin-top: 2em;
    }
  }
</style>
