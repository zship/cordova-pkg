import argparse
import sys


def parse_args(argv):
    parser = argparse.ArgumentParser(
        prog='cordova-pkg',
        description='test',
        add_help=False
    )
    parser.add_argument(
        'www_dir',
        help='directory containing html/js/css to copy to the device'
    )
    parser.add_argument(
        '--platform',
        help='"android" or "ios" currently'
    )
    parser.add_argument(
        '--mode',
        default='debug',
        help='"debug" (default) or "release"'
    )
    parser.add_argument(
        '--embed-crosswalk',
        help='URL to the desired Cordova Android distribution .zip file. If specified, the built app will embed Crosswalk rather than using an Android WebView.'
    )
    parser.add_argument(
        '--build-dir',
        help='perform the build in this directory (default: `mktemp` dir)'
    )
    parser.add_argument(
        '--out-dir',
        help='place the built .apk/.ipa in this directory (default: `pwd`)'
    )
    parser.add_argument(
        '-?', '--help',
        action='help',
        help='show this help message and exit'
    )
    return parser.parse_known_args(args=argv)


def main(argv=None):
    argv = argv or sys.argv
    args, unknown = parse_args(argv[2:])

    for key in args.__dict__:
        val = args.__dict__[key] or ''
        print 'export ' + key.upper() + '="' + val + '";',


if __name__ == "__main__":
    main()
