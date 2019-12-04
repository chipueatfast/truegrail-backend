import { BaseActionWatcher } from 'demux';
import { NodeosActionReader } from 'demux-eos';

import ObjectActionHandler from './ObjectActionHandler';

const handlerVersion = require("./handlerVersions/v1")

const actionHandler = new ObjectActionHandler([handlerVersion])