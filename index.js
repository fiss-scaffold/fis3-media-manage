"use strict";

var rulesMap = {};
var mediaMap = {};

function fisMediaManage(fis) {

    fis.addMediaRule = fis.addMediaRule || function(ruleName, confKey, confObj) {
        if (rulesMap[ruleName]) {
            fis.log.error('addMediaRule fail:ruleName [%s] has existed!', ruleName);
            process.exit(-1);
        }

        if (!confKey) {
            fis.log.error('addMediaRule fail:confKey can not be empty!');
            return false;
        }
        rulesMap[ruleName] = {
            confKey: confKey,
            confObj: confObj
        }

        return fis;
    }


    fis.addMedia = fis.addMedia || function(media, arrRule) {
        var _fis = fis.media(media);
        for (var i = 0, len = arrRule.length; i < len; i++) {
            var ruleName = arrRule[i];
            if (!rulesMap[ruleName]) {
                fis.log.error('fis.addMedia fail:,ruleName[%s] is unset!', ruleName);
                process.exit(-1);
            }
            var rule = rulesMap[ruleName];
            _fis.match(rule['confKey'], rule['confObj']);
        }

        mediaMap[media] = arrRule;

        return _fis;
    }

    fis.extendMedia = fis.extendMedia || function(mediaBase, media, arrMoreRule) {
        if (!mediaMap[mediaBase]) {
            fis.log.error('fis.extendMedia fail,mediaBase[%s] is not existed!', mediaBase);
            process.exit(-1);
        }
        var mediaBaseRule = mediaMap[mediaBase];
        var arrRule = [].concat(mediaBaseRule, arrMoreRule);

        return fis.addMedia(media, arrRule);
    }
}

module.exports = fisMediaManage;