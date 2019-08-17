<template>
  <div class="admin my-4">
    <el-table :data="complaintList" stripe style="width: 100%">
      <el-table-column type="index" width="50"> </el-table-column>
      <el-table-column label="日期" width="110">
        <template slot-scope="scope">
          <span>{{ scope.row.complain_timestamp | date }}</span>
        </template>
      </el-table-column>
      <el-table-column label="消费者" width="100">
        <template slot-scope="scope">
          <span>{{ scope.row.user | userName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="投诉原因">
        <template slot-scope="scope">
          <span>{{ scope.row.complain_type | complaintType }}</span>
        </template>
      </el-table-column>
      <el-table-column label="被投诉公司">
        <template slot-scope="scope">
          <span>{{ scope.row.targetCompany }}</span>
        </template>
      </el-table-column>
      <el-table-column label="详情">
        <template slot-scope="scope">
          <v-clamp class="clamped-text" :max-lines="3" autoresize tag="p"
            >{{ scope.row.complaint_body }}
            <el-button
              size="small"
              v-if="expanded || clamped"
              slot="after"
              slot-scope="{ toggle, expanded, clamped }"
              class="ml-2"
              @click="toggle"
              >{{ expanded ? '收起' : '显示更多' }}</el-button
            >
          </v-clamp>
        </template>
      </el-table-column>
      <el-table-column>
        <template slot-scope="scope">
          <el-button
            @click="deleteComplaint(scope.row.merchant_id)"
            type="danger"
            icon="el-icon-delete"
            circle
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { complaintService, merchantService, searchService } from '../services';
import { ServerComplaintModel } from '@/models';
import remove from 'lodash-es/remove';
import VClamp from 'vue-clamp';

interface ComplaintModel extends ServerComplaintModel {
  targetCompany: string;
}

@Component({
  components: {
    VClamp,
  },
})
export default class Home extends Vue {
  complaintList: any[] = [];

  getLatestComplaints() {
    complaintService.getAllComplaints().then(
      data => {
        Promise.all(
          data.data.map(item =>
            merchantService.queryMerchant(item.merchant_id).then(({ data: merchantInfo }) => {
              const newItem: ComplaintModel = item as any;
              newItem.targetCompany = merchantInfo.storage.Name;

              return newItem;
            }),
          ),
        ).then(output => {
          this.complaintList = output;
        });
      },
      error => {
        this.$message.error(error);
      },
    );
  }

  created() {
    this.getLatestComplaints();
  }

  deleteComplaint(id: number) {
    this.$msgbox.confirm('确认删除此投诉？').then(() => {
      complaintService.deleteComplaint(id).then(() => {
        remove(this.complaintList, v => v.merchant_id === id);
      });
    });
  }
}
</script>
