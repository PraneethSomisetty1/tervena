import test from 'node:test';
import assert from 'node:assert/strict';
import {initial,summary,exportReport,average} from '../public/model.js';
test('weekly summary reflects the fixture measurements',()=>{const s=summary(initial());assert.equal(s.recent,'140/87');assert.equal(s.prior,'129/81');assert.equal(s.delta,11);assert.equal(average([],'s'),null)});
test('sharing off removes connected measurements and note from exported report',()=>{const state={...initial(),share:false,context:'PRIVATE_NOTE'};const s=summary(state);assert.equal(s.recent,null);assert.equal(s.wearable,false);assert.equal(s.context,null);const report=exportReport(state);for(const hidden of ['PRIVATE_NOTE','140/87','129/81','3/7 days'])assert.ok(!report.includes(hidden));assert.ok(report.includes('Hypertension listed'))});
test('disconnecting cuff removes BP but retains shared wearable evidence',()=>{const s={...initial(),bp:false};assert.equal(summary(s).recent,null);assert.equal(summary(s).wearable,true);assert.ok(!exportReport(s).includes('140/87'))});
test('disconnecting wearable removes coverage but retains BP',()=>{const s={...initial(),wearable:false};assert.ok(!exportReport(s).includes('3/7 days'));assert.equal(summary(s).recent,'140/87')});
test('review status and edited context are reflected in export',()=>{const report=exportReport({...initial(),reviewed:true,context:'Sample routine change.'});assert.ok(report.includes('Sample routine change.'));assert.ok(report.includes('Reviewed in this demo session.'))});
